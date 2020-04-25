import { createContext, createState, useContext } from 'solid-js';
import { Suspense, Show } from 'solid-js/dom';
import history from 'history/browser';

const defaultState = {
  ready: false,
  currentPath: history.location.pathname,
  currentRoute: null as null | Route,
  routes: [] as Route[],
};

const RouterCtx = createContext<[typeof defaultState, any]>([
  defaultState,
  () => null,
]);

const findRoute = (routes: Route[], path: string) =>
  routes.find((r) => r.path === path);

export function Router(props: RouterProps): any {
  const [state, setState] = createState({
    ...defaultState,
    routes: props.routes,
    currentRoute: findRoute(props.routes, history.location.pathname),
  });

  history.listen(({ location }) => {
    setState((state) => {
      const route = findRoute(state.routes, location.pathname);
      state.currentPath = location.pathname;
      state.currentRoute = route;
    });
  });

  setState('ready', true);

  return () => (
    <RouterCtx.Provider value={[state, setState]}>
      {props.children}
    </RouterCtx.Provider>
  );
}

export function RouterView() {
  const [state] = useContext(RouterCtx);

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Show when={state.ready && !!state.currentRoute}>
        <div>{state.currentRoute.component()}</div>
      </Show>
    </Suspense>
  );
}

export function Link(props: LinkProps) {
  const [state] = useContext(RouterCtx);
  const activeClass = () => props.activeClass || 'active-route';

  const handleClick = (e: Event & { target: HTMLAnchorElement }) => {
    e.preventDefault();
    history.push(props.href);
  };

  return (
    <a
      href={props.href}
      onClick={handleClick}
      class={props.class}
      classList={{ [activeClass()]: state.currentPath === props.href }}
    >
      {props.children}
    </a>
  );
}

export function useRouter() {
  return useContext(RouterCtx);
}

// TYPES

export type Route = {
  name: string;
  path: string | RegExp;
  component: any;
};

type RouterProps = {
  children: any;
  routes: Route[];
};

type LinkProps = {
  children: any;
  class?: string;
  activeClass?: string;
  href: string;
};
