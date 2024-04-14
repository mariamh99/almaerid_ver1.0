import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import listingRoute from "./routes/listing.route.js";
import orderRoute from "./routes/order.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url"; // Import fileURLToPath function
dotenv.config();

const app = express();
app.use(cors({ origin:[
  "http://localhost:5174",
  "http://localhost:5173",

  "https://almaerid.netlify.app"
], credentials: true }));

app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO);

app.use(bodyParser.json());

// Resolve directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, "../client/dist");

app.use(express.static(buildPath));

app.use('/uploads', express.static('uploads'));
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/listings", listingRoute);
app.use("/api/orders", orderRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.get("/*", function(req, res){
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }
  );
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

export default app;
