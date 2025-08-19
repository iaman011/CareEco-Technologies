import express from "express";
import mongoose from "mongoose";
import cron from "node-cron";
import dotenv from "dotenv";

import { syncData } from "./syncService.js"; 
import localRoutes from "./routes/localRoutes.js";
import cloudRoutes from "./routes/cloudRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Data Sync Server is running...");
});

// Routes
app.use("/api/local", localRoutes);

app.use("/api/cloud", cloudRoutes);

app.get("/api/sync/:mode", async (req, res) => {
  try {
    const mode = req.params.mode;
    const result = await syncData(mode); 
    res.json({
      message: `Sync completed in mode: ${mode}`,
      summary: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sync failed", error: err.message });
  }
});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error:", err));

// Cron job (every 1 min)
cron.schedule("* * * * *", () => {
  console.log("Running scheduled sync...");
  syncData("both");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
