import conf from '@/conf/conf';
import { Client, Account, Databases } from 'appwrite';



export const client = new Client();
client.setEndpoint(conf.appwriteurl).setProject(conf.appwriteProjectId);

export const account = new Account(client);
export const database = new Databases(client);

