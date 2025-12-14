import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
const port = 2005;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://gayathrimahalingam2204_db_user:gayathri@cluster0.7nqyrkd.mongodb.net/")
  .then(() => console.log("mongoose connected"))
  .catch(err => console.error(err));

const signup = mongoose.model("Signup", {
  Name: String,
  Email: String,
  Password: String
 
});

app.post("/signup", async (req, res) => {
  const { Name, Email, Password } = req.body;
  const hashedPassword = await bcrypt.hash(Password, 10);
  const data = new signup({ Name, Email, Password: hashedPassword });
  await data.save();
  res.json({ msg: "data saved", data });
});

app.listen(port, () => console.log("server running on port", port));
