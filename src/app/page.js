import Link from "next/link";

export default function Page() {
  return (
      <div className="flex flex-col items-center justify-center h-full py-20 bg-gray-800 ">
        <div className="px-4 mx-auto text-center ">
          <p className="mb-6 text-4xl font-bold text-amber-400">Welcome to BTTracker App</p>
          <p className="mb-8 text-xl">Track your money and start saving now!</p>
          <Link href={'/'} className="px-4 py-3 font-bold text-gray-900 rounded-lg bg-amber-400 hover:bg-amber-300">Get Started</Link>
        </div>
      </div>
  );
}
