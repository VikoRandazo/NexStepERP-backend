import { Request, Response, NextFunction } from "express";
import { UserModel } from "../../database/schemas/user";
import { UserDetails } from "../models/UserDetails";
import { userValidationSchema } from "../validation/auth/registerValidation";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export const handleSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const body: UserDetails = req.body;
  const { email } = body;

  try {
    const validatedBody = await userValidationSchema.validate(body);

    // find user
    const foundUser = await UserModel.findOne({ email: email });

    // produce token
    const { password, ...rest } = body;
    const secret = process.env.SECRET;
    const access_token = jwt.sign(rest, secret || `iIsInR5cCI6Ikp`, { expiresIn: `7d` });

    if (foundUser) {
      // send error message
      res.status(200).json({ message: `email is already in use` });
    } else {
      // encrypt password
      const encryptedPassword = await bcrypt.hash(body.password, 10);
      body.password = encryptedPassword;

      // create new user document on database
      const createdUser = await UserModel.create(body);
      const user = createdUser.toObject();
      const { password, ...rest } = user;
      const newUser = rest;

      // return success response to the client
      res.status(201).json({ user_verified: true, user: newUser, access_token });
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  const body: UserDetails = req.body;
  const { email, password: passwordToCheck } = body;
  try {
    // find user
    const foundUser = await UserModel.findOne({ email: email });

    if (foundUser) {
      // check password
      const user = foundUser.toObject();
      const isPasswordValid = await bcrypt.compare(passwordToCheck, user.password);

      const { password, ...rest } = user;
      if (isPasswordValid) {
        // produce token
        const access_token = jwt.sign(rest, process.env.SECRET!);
        // return
        res.status(200).json({ user_verified: true, user: rest, access_token });
      } else {
        res.status(401).json({ user_verified: false, message: "incorrect email or password" });
      }
    }
  } catch (error) {
    console.log(error);
  }

  //correct => res "user_verified:true, userFound"
  //wrong => res "user_verified:false, message:`email or password incorrect`"
};
