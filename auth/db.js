import mongoose from "mongoose";

// const uri = `mongodb+srv://suryathombre:WoZYUSnBsgLjFTw4@cluster.ijno3qe.mongodb.net/?retryWrites=true&w=majority`
const uri = "mongodb+srv://suryathombre:WoZYUSnBsgLjFTw4@cluster.ijno3qe.mongodb.net/favCart?retryWrites=true&writeConcern=majority";

let conn = mongoose.connection;

export const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        conn.on('connected', function() {
            console.log('database is connected successfully');
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        conn.on('error', console.error.bind(console, 'connection error:'));
    }
}

export default conn;