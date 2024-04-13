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
import path from "path"
dotenv.config();

const app = express();
console.log(process.env.CORS_URL)
app.use(cors({ origin:[
  "http://localhost:5174",
  "https://almaerid-ver1-0.onrender.com"
], credentials: true }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO);
const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../client/build");

app.use(express.static(buildPath))
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


const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
})


export default app;