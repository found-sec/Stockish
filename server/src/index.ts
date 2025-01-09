import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan"; // Import morgan
import cors from "cors"; // Import CORS
import rateLimit from "express-rate-limit"; // Import rate limit

// Load environment variables from .env file
dotenv.config();

// App initialization
const app: Express = express();
const PORT = process.env.PORT || 3010;

// CORS setup
const allowedOrigins = [
  "http://localhost:3000", // Frontend during local development
  "https://stockish.vercel.app", // Deployed frontend on Vercel
  "https://stockish-backend.onrender.com", // Backend URL if using Render
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Logging setup with morgan
app.use(morgan("tiny"));
app.use(express.json());

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 250, // Limit each IP to 250 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiter to the API routes
app.use("/api/", apiLimiter); // General API rate limiter

// Routes setup (Ensure your routes are properly defined in "./routes")
app.use(require("./routes"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
