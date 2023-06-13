import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/authToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if the user is already a member

    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(404).json({ message: "This email is already in use" });

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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user email is availbale

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ message: "No user associated with that email" });

    //compare password
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword)
      return res.status(400).json({ message: "Password do not match" });

    //everything is right, ingest token

    // const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN, {
    //   expiresIn: "30s",
    // });

    res.cookie("accessToken", generateToken(user._id, user.name, user.email), {
      httpOnly: true,
    });
    if (user) {
      return res.status(201).json({
        _id: user._id,
        token: generateToken(user._id, user.name, user.email),
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
//     expiresIn: "30d",
//   });
// };

export const profile = async (req, res) => {
  try {
    const { _id, name, email } = await User.findById(req.user.id);

    return res.status(200).json({ id: _id, name, email });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {};
