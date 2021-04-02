import express from 'express';
import UserController from '../controller/AuthController';
import Validator from '../middleware/validator';

const router = express.Router();

router.post('/auth/signup',Validator.newAccountRules(),Validator.validateInput,UserController.UserController.signup);
router.post('/auth/signin',UserController.UserController.signin);


export default router;

