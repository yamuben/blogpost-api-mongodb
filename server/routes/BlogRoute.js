import express from 'express';
import BlogController from '../controller/BlogController';
import {verifyAuth} from "../middleware/authVerification";
import Validator from '../middleware/validator';


const blogRouter = express.Router();

blogRouter.post('/create',verifyAuth, BlogController.createBlog);
blogRouter.get('/getallfromapi',BlogController.getAllBlogsFromAPI);
blogRouter.get('/all',BlogController.getAllBlogs);
blogRouter.get('/:id',verifyAuth, BlogController.getOneBlog)
blogRouter.delete('/:id',verifyAuth,Validator.verifyAccess,BlogController.deleteOneBlog)
blogRouter.patch('/:id',verifyAuth,Validator.verifyAccess,BlogController.updateOneBlog)



export default blogRouter;

