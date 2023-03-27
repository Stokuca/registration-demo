import express  from "express";
import {addUser, logIn} from '../controllers/users.js'

const router = express.Router();

router.post('/login', logIn);

router.post('/register', addUser);

export default router;