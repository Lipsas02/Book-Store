import express, { Router } from 'express';
const router = express.Router();
import { Book } from '../models/bookmodel.js';

//route for save a new book
router.post('/',async(request,response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishyear
        ){
            return response.status(400).send({
                message: 'send all required fields: title, author, publishyear',
            });
        }
        const newBook = {
            title: request.body.title ,
            author: request.body.author,
            publishyear: request.body.publishyear,
        };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
    });
    //route for get all book from database 
    router.get('/', async(request,response) => {
        try{
    const books = await Book.find({});
    return response.status(200).json({
        count: books.length,
        data: books
    });
        } catch (error){
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
    });
    //route for get one book from database by id
    router.get('/:id', async(request,response) => {
        try{
            const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
        } catch (error){
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
    });
    //route for update a book 
    router.put('/:id', async (request,response) => {
        try{
            if(
                !request.body.title ||
                !request.body.author ||
                !request.body.publishyear
            ){
                return response.status(400).send({
                    message: 'send all required fields: title, author, publishyear',
                });
            }
            const { id } = request.params;
            const result = await Book.findByIdAndUpdate(id,request.body,);
            if(!result){
                return response.status(404).json({message: 'book not found'});
            }
    
            return response.status(200).json({message: 'book updated succesfully'});
        } catch (error) {
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
    });
    //route for delete a book
    router.delete('/:id',async (request,response) => {
        try{
            
            const { id } = request.params;
            const result = await Book.findByIdAndDelete(id);
            if(!result){
                return response.status(404).json({message: 'book not found'});
            }
    
            return response.status(200).json({message: 'book deleted succesfully'});
        } catch (error) {
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
    });
    export default router;