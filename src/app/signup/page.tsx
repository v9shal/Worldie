import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import Link from "next/link";
import { User } from "@/models/userModel";
  import bcrpyt from 'bcryptjs'
import { redirect } from "next/navigation";
import  connectToDatabase  from "@/app/db";
  const Page = () => {
    const HandleSubmit=async ( formData:FormData)=>{
        "use server";
        const name=formData.get("name") as string| undefined;
        const email=formData.get("email") as string| undefined;
        const password=formData.get("password") as string| undefined;
        if(!name||!password||!email) throw new Error("please provide all fields");
        // check for user
       await connectToDatabase();
        const user =await User.findOne({email});
        if(user) throw new Error("user already exists");
        // hash password
        const hashedPassword=await bcrpyt.hash(password,10);
        // create user
        await User.create({
            name,email,password:hashedPassword
        })
        // redirect to login
        return redirect('/login')
    }
        
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form  action={HandleSubmit} className="flex flex-col gap-4">
                <Input  name="name" placeholder="name" className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <Input placeholder="Enter your email" name="email"className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <Input type="password"name="password" placeholder="Enter your password" className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <Button variant="outline" type="submit" className="py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Register</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <span className="text-gray-500 mb-4">OR</span>
            <form>
              <Button className="py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                Login with Google
              </Button>
            </form>
            <Link href="/login" passHref>
              <div className="mt-4 text-blue-500 hover:underline">Already have an account?</div>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  
  export default Page
