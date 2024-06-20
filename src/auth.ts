import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from '@/models/userModel' // Make sure the import path is correct
import { compare } from "bcryptjs"
import  ConnectToDatabase  from "./app/db"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined
        const password = credentials.password as string | undefined
        console.log(email, password)
        if (!email || !password)
          throw new CredentialsSignin('please provide both fields')

        // Connect to the database
        await ConnectToDatabase()

        const user = await User.findOne({ email }).select("+password")
        if (!user) throw new CredentialsSignin("invalid email and password")
        if (!user.password)
          throw new CredentialsSignin("invalid password")

        const matchPassword = await compare(password, user.password)
        if (!matchPassword)
          throw new CredentialsSignin("invalid password")

        return { name: user.name, email: user.email, id: user._id }
      }
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages:{
    signIn:'/login',
  }
})