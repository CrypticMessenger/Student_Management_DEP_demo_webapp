import {MongoClient} from "mongodb"
import {URI,DataBase,studentCollection} from "./Admin/DataBase.js"

async function main()
    {   
        const client = new MongoClient(URI)
        try{
            
        }
        catch(e){
            console.log(e)
        }
        finally{
            client.close();
        }
    }

main().catch((e) => {console.log(e)})