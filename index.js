import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();
//middleware for parsing request body
app.use(express.json());
//middleware for handling CORS policy
app.use(cors());//allow all origin with default of cors(*)
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['content-Type'],
// })
// );//allow custom origin

app.get('/', (request,response) => {
console.log(request);
return response.status(234).send('Welcome to MERN Stack Tutorial');

});

app.use('/books',booksRoute);
mongoose
.connect(mongoDBURL)
.then( () => {
console.log('APP is connected to database');
app.listen(PORT, () => {
    console.log(`app is listening to port: ${PORT}`);
});
})
.catch((error) => {
console.log(error);
});