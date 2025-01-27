import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.STOTRA_JWT_SECRET;
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import User from "../models/user.model";
import axios from "axios";

const inappropriateWords = [
    "Fent" , "fenttweaker", "fentanyl","benjaminnetanyahu", "netanyahu","adolfhitler" , "adolf" , "hitler","putain" , "merde", "taguele","conne","hmar", "sharmoot", "sharmoota", "sharmootah" , "gazma", "kosomak", "kos","alphakennybody" , "mikeox", "nillkiggers", "kneegrow", "mikehawk", "nate higgers","asshole", "bitch", "bastard", "dickhead", "fuck", "motherfucker", "shit", "cunt", "cock", "pussy", 
    "prick", "whore", "slut", "faggot", "dyke", "bimbo", "hoe", "ass", "bimbo", "jackass", "twat", 
    "douche", "douchebag", "sonofabitch", "bastards", "fucker", "shitter", "cockhead", "cum", "cumshot", 
    "clit", "vagina", "penis", "dildo", "bukkake", "orgasm", "rapist", "pedophile", "incest", "zoophilia", 
    "necrophilia", "bestiality", "heroin", "meth", "crackhead", "crack", "smackhead", "junkie", "stoner", 
    "methhead", "addict", "homo", "queer", "tranny", "transvestite", "whorehouse", "brothel", "hooker", 
    "escort", "gigolo", "gimp", "retard", "moron", "imbecile", "stupid", "dumbass", "dumbfucker", "fuckhead", 
    "fucktard", "cockslut", "asslips", "fistfuck", "cockblock", "shithead", "ballbuster", "slutty", "bastardized", 
    "cockknocker", "fuckboy", "wanker", "cocksucker", "arsehole", "buttfuck", "shitstain", "skank", "cumwhore", 
    "fag", "homoerotic", "nigger", "spic", "chink", "gook", "sandnigger", "wetback", "kike", "cracker", 
    "yellowman", "redneck", "hillbilly", "guido", "yankee", "slave", "honky", "faggotass", "dickhead", 
    "poof", "freak", "mongoloid", "scumbag", "clownfucker", "dickweed", "asswipe", "dickfart", "pisshead", 
    "numbnuts", "shitbag", "poophole", "gash", "douchefucker", "pissfuck", "fartknocker", "bitchass", 
    "dickbrain", "assclown", "fatass", "cowfuck", "twink", "bitchface", "shitmuncher", "cuntlicker", 
    "dirtywhore", "filthfreak", "cumfreak", "crotchlicker", "pussylicker", "cumdumpster", "shitfucker"
];
// Add more inappropriate words here

const isUsernameAppropriate = (username: string): boolean => {
    const lowerCasedUsername = username.toLowerCase();
    return !inappropriateWords.some((word) => lowerCasedUsername.includes(word));
};
const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

const signup = (req: Request, res: Response) => {
    /* 
    #swagger.tags = ['Authentication']
    */
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    // Step 1: Validate email format
    if (!isValidEmail(req.body.email)) {
        res.status(400).send({ message: "Invalid email format!" });
        return;
    }

    // Step 2: Check if the email is already registered
    User.findOne({ email: req.body.email })
        .then((existingUser) => {
            if (existingUser) {
                res.status(400).send({ message: "Email is already registered!" });
                return;
            }

            // Step 3: Create new user if email is valid and not already taken
            const newUser = new User({
                email: req.body.email,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8),
                watchlist: [],
                ledger: [],
                positions: [],
                cash: 300_00,
            });

            newUser
                .save()
                .then(() => {
                    res.status(200).send({ message: "User was registered successfully!" });
                })
                .catch((err) => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch((err) => {
            res.status(500).send({ message: "Error checking email in database" });
        });
};

const login = (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['Authentication']
	*/
	validateTurnstile(req.body["cf-turnstile-response"])
		.then((_) => {
			User.findOne({
				username: req.body.username,
			})
				.then((user) => {
					if (!user) {
						return res.status(404).send({ message: "User Not found." });
					}

					var passwordIsValid = bcrypt.compareSync(
						req.body.password,
						user.password
					);

					if (!passwordIsValid) {
						return res.status(401).send({
							accessToken: null,
							message: "Incorrect password",
						});
					}

					const token = jwt.sign({ id: user.id }, jwtSecret!, {
						algorithm: "HS256",
						allowInsecureKeySizes: true,
						expiresIn: "7 days",
					});
					res.status(200).send({
						id: user._id,
						username: user.username,
						accessToken: token,
					});
				})
				.catch((err: Error) => {
					res.status(500).send({ message: err.message });
				});
		})
		.catch((err: Error) => {
			res.status(400).send({ message: err.message });
			return;
		});
};

// New forgotPassword function
const forgotPassword = async (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['Authentication']
	*/
	const { email, username, newPassword, confirmNewPassword } = req.body;

	// Ensure all required fields are provided
	if (!email || !username || !newPassword || !confirmNewPassword) {
		return res.status(400).send({ message: "All fields are required." });
	}

	// Check if passwords match
	if (newPassword !== confirmNewPassword) {
		return res.status(400).send({ message: "Passwords do not match." });
	}

	try {
		// Find user by email and username
		const user = await User.findOne({ email, username });

		if (!user) {
			return res.status(404).send({ message: "User not found." });
		}

		// Hash the new password
		const hashedPassword = bcrypt.hashSync(newPassword, 8);
		user.password = hashedPassword;

		// Save updated password
		await user.save();
		return res.status(200).send({ message: "Password updated successfully." });
	} catch (err) {
		return res.status(500).send({ message: "Error updating password." });
	}
};

const validateTurnstile = async (token: string): Promise<any> => {
	/*
	#swagger.tags = ['Authentication']
	*/
	let secret = process.env.STOTRA_TURNSTILE_SECRET;

	if (!secret) {
		throw new Error("Turnstile secret not found");
	}

	let res = await axios
		.post("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
			secret: process.env.STOTRA_TURNSTILE_SECRET,
			response: token,
		})
		.catch((err) => {
			throw new Error(err);
		});

	if (res.data.success) {
		return true;
	} else {
		throw new Error(
			"Can't validate turnstile token: " + res.data["error-codes"]
		);
	}
};

export default { signup, login, forgotPassword };
