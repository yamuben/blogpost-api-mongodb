import express from 'express';
import UserController from '../controller/AuthController';
import Validator from '../middleware/validator';
import {verifyAuth} from '../middleware/authVerification';

const router = express.Router();

router.post('/auth/signup',Validator.newAccountRules(),Validator.validateInput,UserController.UserController.signup);
router.post('/auth/signin',UserController.UserController.signin);
router.post('/auth/change-password',verifyAuth,UserController.UserController.changePassword);


export default router;

