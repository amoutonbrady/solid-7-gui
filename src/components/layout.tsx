import { Link } from '../router';

export default function Layout(props: Props) {
  return (
    <>
      <header>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </header>
      {props.children}
    </>
  );
}

type Props = {
  children: any;
};
