import mongoose from "mongoose";
import { config } from "../config/constrants";

class MongoConnection {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.MONGO_CONNECTION);
            console.log("database conectdado");
            
        }catch(error){
            console.error(error)
            process.exit(1);
        } 
    }
}

export default new MongoConnection;