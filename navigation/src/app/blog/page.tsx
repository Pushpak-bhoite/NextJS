import Link from "next/link";

export default function Blog() {
  return (
    <div className="min-h-screen bg-white ">
      <h1 className="bg-white">Welcome to blog page </h1>
      <Link href={'/blog'}>/blog</Link>
      <br />
      <Link href={'/about'}>/about</Link>
      <br />
      <Link href={'/'}>/home</Link>
    </div>
  );
}
