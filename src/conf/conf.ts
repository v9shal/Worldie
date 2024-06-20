
const conf={
    appwriteurl:String(process.env.
        NEXT_PUBLIC_APPWRITE_URL
    ),
    authSec:String(process.env.NEXT_AUTH_SECRET),

    appwriteProjectId:String(process.env.
        NEXT_PUBLIC_APPWRITE_PROJECT_ID
    ),
    appwriteDatabaseId:String(process.env.
        NEXT_PUBLIC_APPWRITE_DATABASE_ID
    ),
    appwriteCollectionId:String(process.env.
        NEXT_PUBLIC_APPWRITE_COLLECTION_ID
    ),
    appwriteCollectionmessageId:String(process.env.
        NEXT_PUBLIC_APPWRITE_COLLECTION_MESSAGE_ID
    )

}
export default conf;
