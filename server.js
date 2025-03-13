import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();

const connectDB = async () => {
  try {
    const connectionString = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DB_PASSWORD,
    );
    await mongoose.connect(connectionString);
    console.log(`Connection successful`);
  } catch (error) {
    console.log(error);
  }
};

connectDB();

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(`Enigma server listening on port: ${PORT}`);
});
