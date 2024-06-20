
import { auth } from "@/auth";
import LoginForm from "@/components/client/fom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session?.user) redirect("/room");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <span className="text-gray-500 mb-4">OR</span>
          {/* <form>
            <Button className="py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
              Login with Google
            </Button>
          </form> */}
          <Link href="/signup" passHref>
            <div className="mt-4 text-blue-500 hover:underline">Register here</div>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
