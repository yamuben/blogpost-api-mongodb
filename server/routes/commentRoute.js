import express from "express";
import commentController from "../controller/commentController";
import {verifyAuth} from '../middleware/authVerification';

const commentRoute = express.Router();

commentRoute.post('/create/:id',verifyAuth,commentController.createComment);


export default commentRoute;