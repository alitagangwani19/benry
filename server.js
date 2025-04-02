require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProfileSchema = new mongoose.Schema({
  name: String,
  photo: String,
  description: String,
  lat: Number,
  lng: Number,
});
const Profile = mongoose.model("Profile", ProfileSchema);

app.get("/api/profiles", async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

app.post("/api/profiles", async (req, res) => {
  const profile = new Profile(req.body);
  await profile.save();
  res.json(profile);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
