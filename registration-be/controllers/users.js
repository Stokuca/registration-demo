import register from "../mongodb.js";
import { registerValidation, lodInValidation} from "../validation.js";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const logIn = async (req, res) => {
  try {

    const value = await lodInValidation.validate(req.body);
      if (value == undefined) {
        return res.status(400).json({ message: "There has been an error with the data that was sent!"});
      }
    const email = value.email;
    const existingUser = await register.findOne({email}).exec();

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid data. Please register again." });
    }
    const isMatch = await bcrypt.compare(value.password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password. Please try again." });
    }

    const payload = {
      user: {
        id: existingUser.id,
        firstName: existingUser.firstName
      }
    }
    //Kako je kod stvar testa tako sam ostavio generisanje tokena i ako ga ne koristim, nego samo kao drugo resenje za autorizaciju.
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, firstName: existingUser.firstName });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There has been an error during login." });
  }
};

export const addUser = async (req, res) => {
    try {
      const value = await registerValidation.validate(req.body);
      if (value == undefined) {
        return res.status(400).json({ message: "There has been an error with the data that was sent!"});
      }

      const existingUser = await register.findOne({ email: value.email });
      if (existingUser) {
        return res.status(400).json({ message: "A user with this email already exists."});
      }

      const password = value.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const data = {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: hashedPassword,
      };

      await register.insertMany([data]);
      res.status(200).json({ firstName: value.firstName });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "There was an error during registration. Please try again later." });
    }
};

  
