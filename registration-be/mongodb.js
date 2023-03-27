import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DB_STRING)
.then(() => {
    console.log("mongodb connect");
}).catch(() => {
    console.log("Failed to connect ", process.env.DB_STRING);
});

const registerUser = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const register = new mongoose.model("Register", registerUser);

export default register;
