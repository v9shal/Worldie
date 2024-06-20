// page.ts
"use server"
import { auth } from '@/auth';

export const getUser = async () => {
  const session = await auth();
  const user = session?.user?.name;
  return user;
};
export const getId=async()=>{
  const session =await auth();
  const userId= session?.user?.id;
  return userId;
}
