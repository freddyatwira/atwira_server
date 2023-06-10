import jwt from "jsonwebtoken";

const secret = process.env.ACCESS_TOKEN;

export const generateToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, secret, {
    expiresIn: "30d",
  });
};
