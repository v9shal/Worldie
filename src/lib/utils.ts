import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// export const connectToDatabse=async()=>{
//   // connect to databse mongoose
//   try{
//     if(mongoose.connection && mongoose.connections[0]) return;
//     await mongoose.connect( process.env.NEXT_MONGODB_URI as string,{
//       dbName:"nextAuth"
//     })
//       console.log("connected to database")
//       }catch(err){
//         console.log(err)
//         }
        
//   }

 