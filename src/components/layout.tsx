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
                activeClass="underline text-white font-bold"
              >
                Counter
              </Link>
            </li>
            <li>
              <Link
                href="/temperature"
                activeClass="underline text-white font-bold"
              >
                Temperature
              </Link>
            </li>
            <li>
              <Link href="/flight" activeClass="underline text-white font-bold">
                Flight
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
