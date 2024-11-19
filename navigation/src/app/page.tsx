import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white ">
      <h1 className="bg-white">Hello jjj</h1>
      <Link href={'/'}>/home</Link>
      <br />
      <Link href={'/blog'}>/blog</Link>
      <br />
      <Link href={'/about'}>/about</Link>
      <br />
      <Link href={'/products'}>/prooducts</Link>

    </div>
  );
}
