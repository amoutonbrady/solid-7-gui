import { render } from 'solid-js/dom';
import { Layout } from './components';
import { routes } from './routes';
import { Router, RouterView } from './router/index';

function App(): any {
  return (
    <Layout>
      <RouterView />
    </Layout>
  );
}

render(Router({ routes, children: App }), document.getElementById('app'));
