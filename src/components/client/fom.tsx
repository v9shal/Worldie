"use client"

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import LoginHandler from "@/action/login";
import { redirect, useRouter } from "next/navigation";


const LoginForm=()=>{
    const router =useRouter();
   return( <form action={async(formData)=>{
    const email=formData.get("email") as string;
      const password =formData.get("password") as string;
       if(!email||!password) return  toast.error("please provide all fields")
        const toastId=toast.loading("loggin in");
    
       const error= await LoginHandler(email,password)
        if(!error) toast.success("login soccesful",{
            id:toastId
        })
       



    else{
        toast.error(String(error),{id:toastId})
    }
    router.refresh()
    }}
    
    className="flex flex-col gap-4">
        
            
       <Input  name="email"placeholder="Enter your email" className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
       <Input type="password"name="password" placeholder="Enter your password" className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
       <Button variant="outline" type="submit" className="py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Login</Button>
     </form>
     )
    }
    export default LoginForm;