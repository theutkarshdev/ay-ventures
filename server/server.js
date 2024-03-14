import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./db.js";
import investorRoutes from "./routes/investorRoutes.js";
import startUpRoutes from "./routes/startUpRoutes.js";
import { startCronJob } from "./controller/cron.js";
import  MatchMakingRoutes  from "./routes/matchMakingRoutes.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
//startCronJob();

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.static("public"));

// Connect to MongoDB and start the server
connectToMongoDB()
  .then(() => {
    // Use the user routes
    app.use("/api/investor", investorRoutes);
    app.use("/api/startup", startUpRoutes);
    app.use("/",MatchMakingRoutes)



    app.all('*',(req,res)=>{
res.status(400).json({message:"invalid request"})
    })
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
