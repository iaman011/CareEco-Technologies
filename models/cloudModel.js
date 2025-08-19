import mongoose from "mongoose";

const cloudSchema = new mongoose.Schema({
  name: String,
  value: String,
  updatedAt: { type: Date, default: Date.now },
  lastSyncedAt: { type: Date, default: new Date(0) },
});

const CloudData = mongoose.model("CloudData", cloudSchema);

export default CloudData;
