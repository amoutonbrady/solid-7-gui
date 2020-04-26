import { Link, useRouter } from '../router';

export default function Layout(props: Props) {
  const [state] = useRouter();

  return (
    <>
      <aside class="border-r border-gray-800">
        <nav class="p-4">
          <ol class="list-decimal flex flex-col space-y-3 pl-4">
            <li>
              <Link
                href="/counter"
                class="hover:underline"
                activeClass="underline text-white font-bold"
              >
                Counter
              </Link>
            </li>
            <li>
              <Link
                href="/temperature"
                class="hover:underline"
                activeClass="underline text-white font-bold"
              >
                Temperature
              </Link>
            </li>
            <li>
              <Link
                href="/flight"
                class="hover:underline"
                activeClass="underline text-white font-bold"
              >
                Flight
              </Link>
            </li>
            <li>
              <Link
                href="/timer"
                class="hover:underline"
                activeClass="underline text-white font-bold"
              >
                Timer
              </Link>
            </li>
            <li>
              <Link
                href="/crud"
                class="hover:underline"
                activeClass="underline text-white font-bold"
              >
                CRUD
              </Link>
            </li>
          </ol>
        </nav>
      </aside>

      <main class="py-10 overflow-auto flow-root">
        <h1 class="text-2xl font-bold text-center">
          {state.currentRoute.name}
        </h1>

        {props.children}
      </main>
    </>
  );
}

type Props = {
  children: any;
};
