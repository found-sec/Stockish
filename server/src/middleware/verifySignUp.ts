import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import validator from "validator";  // Use the validator package for sanitization and validation

// Sanitize and validate inputs
const sanitizeInput = (input: string): string => {
    // Sanitize and escape any harmful characters (e.g., script tags)
    return validator.escape(input); // This will escape HTML characters like < > & etc.
};

const validateUsername = (username: string): boolean => {
    // Regex for validating a username (letters, numbers, underscores, dashes, and spaces allowed)
    const regex = /^[a-zA-Z_ ]+$/;
    return regex.test(username);
};



const validateEmail = (email: string): boolean => {
    // Use validator to check if the email is valid
    return validator.isEmail(email);
};


const validatePassword = (password: string): boolean => {
    // Regex for password validation (e.g., at least 8 characters, contains upper and lower case, a number, and a special character including '#')
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(password);
};


// Middleware to check if username is already taken
const checkDuplicateUsername = (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    
    if (!validateUsername(username)) {
        return res.status(400).send({ message: "Invalid username format/contains inappropriate words" });
    }
    
    if (!validateEmail(sanitizedEmail)) {
        return res.status(400).send({ message: "Invalid email format" });
    }
    if (!validatePassword(sanitizedPassword)) {
        return res.status(400).send({ message: "Invalid password format" });
    }

    // Check for duplicate username
    User.findOne({ username })
        .then((user) => {
            if (user) {
                res.status(400).send({ message: "Username is already in use" });
                return;
            }
            next();
        })
        .catch((err) => {
            console.log("err", err);
            res.status(500).send({ message: err });
        });
};

// Middleware to check for duplicate email
const checkDuplicateEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const sanitizedEmail = sanitizeInput(email);

    if (!validateEmail(sanitizedEmail)) {
        return res.status(400).send({ message: "Invalid email format" });
    }

    User.findOne({ email: sanitizedEmail })
        .then((user) => {
            if (user) {
                res.status(400).send({ message: "Email is already in use" });
                return;
            }
            next();
        })
        .catch((err) => {
            console.log("err", err);
            res.status(500).send({ message: err });
        });
};

// Export middleware functions
const verifySignUp = {
    checkDuplicateUsername,
    checkDuplicateEmail,

};

export default verifySignUp;
