import mongoose from "mongoose";
export const ConnectToDatabase = async () => {
    try {
      if(mongoose.connection && mongoose.connections[0].readyState) return ;
      await mongoose.connect(process.env.MONGO_URL as string,);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  
  export default ConnectToDatabase;
  