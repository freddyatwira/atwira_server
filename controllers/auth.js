import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if the user is already a member

    const oldUser = await User.findOne({ email });

    if (oldUser) return res.json({ message: "This email is already in use" });

    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedpwd = bcrypt.hashSync(password, salt);

    //now add the new user

    const addUser = await new User({
      name,
      email,
      password: hashedpwd,
    }).save();

    return res.status(201).json(addUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
