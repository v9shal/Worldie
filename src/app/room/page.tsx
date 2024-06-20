"use client";
import { client, database } from '@/appwrite/config';
import conf from '@/conf/conf';
import React, { useState, useEffect } from 'react';
import { ID } from 'appwrite';
import { getUser, getId } from '../hello/page'; // Correct import path to `page.ts`
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'

const Room = () => {
  const router = useRouter();
  const [name, setName] = useState<string | null | undefined>(null);
  const [userid, setUserId] = useState<string | null | undefined>(null);
  const [messages, setMessage] = useState<any[]>([]);
  const [messageBody, setMessageBody] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const userName = await getUser();
      setName(userName);
    };
    const fetchId = async () => {
      const id = await getId();
      setUserId(id);
    }
    fetchId();
    fetchUser();
    getMessages();

    const unsubscribe = client.subscribe(`databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionmessageId}.documents`, (response: any) => {
      console.log("response from real-time", response);
      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        console.log("message was created");
        setMessage(prevState => [...prevState, response.payload]);
      }
      if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
        console.log("message was deleted");
        setMessage(prevState => prevState.filter(message => message.$id !== response.payload.$id));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);



  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageBody.trim()) return;

    try {
      const messageData = {
        username: name,
        userId: userid,
        message: messageBody,
      };
      const response = await database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionmessageId,
        ID.unique(),
        messageData
      );
      setMessageBody("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      await database.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionmessageId, messageId);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const getMessages = async () => {
    const response = await database.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionmessageId);
    setMessage(response.documents);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chat Messages</h2>
        <h2>hello {name}</h2>
        <div className="space-y-2 mb-6 h-96 overflow-y-auto">
          {messages.map((text) => (
            <div key={text.$id} className="bg-gray-100 rounded-lg shadow-sm p-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 text-xs">
                  {new Date(text.$createdAt).toLocaleString()}
                </span>
                {/* <button onClick={() => deleteMessage(text.$id)} className="mt-2 text-red-500 hover:text-red-700 focus:outline-none">
                  Delete
                </button> */}
              </div>
              <p className="text-gray-800 text-sm font-semibold">{text.username}</p>
              <p className="text-gray-600 text-sm">{text.message}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="bg-gray-50 p-4 rounded-lg shadow-md">
          <textarea
            required
            value={messageBody}
            placeholder="Say something..."
            maxLength={1000}
            onChange={(e) => setMessageBody(e.target.value)}
            className="w-full p-2 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          ></textarea>
          <div className="flex text-gray-500 justify-end">
            <button type="submit" className="py-1 px-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Room;
