import jwt from "jsonwebtoken";

import { User } from "../models/UserModel.js";

const secret = process.env.ACCESS_TOKEN;

export const protect = async (req, res, next) => {
  let token;
  if (
    res.header.authorization &&
    req.header.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.header.authorization.split(" ")[1];
      const decoded = jwt.verify(token, secret);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).send("Not authorized");
    }
  }
  if (!token) {
    res.status(403).send("Access denied, no token");
  }
};
