import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./db.js";
import investorRoutes from "./routes/investorRoutes.js"

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.static("public"));

// Connect to MongoDB and start the server
connectToMongoDB()
  .then(() => {
    // Use the user routes
    app.use("/api/investor", investorRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
