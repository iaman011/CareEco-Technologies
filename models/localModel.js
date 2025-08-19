import mongoose from "mongoose";

const localSchema = new mongoose.Schema({
  name: String,
  value: String,
  updatedAt: { type: Date, default: Date.now },
  lastSyncedAt: { type: Date, default: new Date(0) },
});

const LocalData = mongoose.model("LocalData", localSchema);


export default LocalData;
