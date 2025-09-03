import Link from 'next/link';

export const MyComponent = () => {
  return <div>Hello World</div>;
};

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <button className="default-btn">button</button>
    </div>
  );
}
