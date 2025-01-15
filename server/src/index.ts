const morgan = require("morgan"); // Import morgan
const { log } = require("mercedlogger"); // Import mercedlogger's log function
const cors = require("cors");
const rateLimit = require("express-rate-limit").rateLimit;
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";


// Config/initialization
const app: Express = express();
dotenv.config();

const PORT = process.env.PORT || 3010;
app.set('trust proxy', true);

// Docs
const { swaggerDocs } = require("./utils/swagger");

// Database
const Database = require("./utils/db");
const UserSchema = require("./models/user.model");

// Middleware
app.use(cors({
  origin: "https://stockish.vercel.app",  // Replace with your actual frontend URL
}));

app.use(morgan("tiny"));
app.use(express.json());


// Ratelimiting
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 250, // Limit each IP to 250 requests per window (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the RateLimit-* headers
	legacyHeaders: false, // Disable the X-RateLimit-* headers
});

const loginLimiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minutes
	max: 15, // Limit each IP to 15 login requests per window (here, per 30 minutes)
	message:
		"Too many login attempts from this IP, please try again after an hour.",
	standardHeaders: true,
	legacyHeaders: false,
});




// Apply the rate limiters
app.use("/api/", apiLimiter); // General API rate limiter
app.use("/api/auth/login", loginLimiter); // Uncomment for login-specific rate limiting


// REST Routes
app.use(require("./routes"));

// Start server
app.listen(PORT, async () => {
	
	swaggerDocs(app, PORT);
});
