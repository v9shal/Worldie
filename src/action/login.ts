"use server"
import { signIn, signOut } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { useRouter } from "next/navigation";

const LoginHandler=async(email:string,password:string)=>{
try{
        await signIn("credentials",{
            email,
            password,
            redirect:true,
            redirectTo:"/hello"
        })
    } catch (error) {
        const err= error as CredentialsSignin;
        return err.message
    }
}

export default LoginHandler;  // export default LoginHandler;  // export default LoginHandler;