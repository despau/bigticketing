
import mongoose from 'mongoose';

import { app } from './app';


const start = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('Missing JWT_KEY. It must be defined.')
    }
   
    if (!process.env.MONGO_URI) {
        throw new Error('Missing MONGO_URI. It must be defined.')
    }
    
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MONGO-DB')

    } catch (err) {
        console.error(err);
    }
    
    app.listen(3000, ()=> {
        console.log("Listening on port 3000 auth !! :P ")
    });
}

start();

