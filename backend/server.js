import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/connectDB.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 5050;
const connectionString = process.env.MONGO_URL;

app.use(express.json());
app.use(
  cors()
);
app.use("/api", userRouter);

(async () => {
   try {
      await connectDB(connectionString);
      console.log("Mit MONGODB verbunden!");
      //
      app.listen(port, () => {
         console.log(`Server läuft auf Port: ${port}`);
      });
   } catch (error) {
      console.log(error);
   }
})();
