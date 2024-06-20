import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const username = session?.user?.name;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Hello, {username}!</h1>
        <p className="text-gray-600 mb-6">Nothing to see here...</p>
        <Link href="/room">
          <div className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
            Click here to enter room
        </div>
        </Link>
      </div>
    </div>
  );
}
