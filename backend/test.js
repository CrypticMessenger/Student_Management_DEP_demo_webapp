import {MongoClient} from "mongodb"
import {URI,DataBase,studentCollection} from "./Admin/DataBase.js"

async function main()
    {   
        const client = new MongoClient(URI)
        try{
            client.connect()
            let cursor = client.db('current_users').collection('users').find()
            await cursor.forEach(data => console.log(data))
        }
        catch(e){
            console.log(e)
        }
        finally{
            client.close();
        }
    }

// main().catch((e) => {console.log(e)})

