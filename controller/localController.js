import LocalData from "../models/localModel.js";


export const createLocalData = async (req, res) => {
  try {
    const { name, value } = req.body;

    if (!name || !value) {
      return res.status(400).json({ success: false, error: "Name and value are required" });
    }

    const newData = new LocalData({ name, value, updatedAt: new Date() });
    await newData.save();

    res.status(201).json({ success: true, data: newData });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const getLocalData = async (req, res) => {
  try {
    const data = await LocalData.find();
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
