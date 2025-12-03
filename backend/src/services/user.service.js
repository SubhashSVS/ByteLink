const userModel = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

const register = async ( name, email, password ) => {
  const existing = await userModel.findByEmail(email);
  if(existing) 
    throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  return userModel.createUser(name, email, hashedPassword);
}

const login = async (email, password) => {
  const user = await userModel.findByEmail(email);
  if(!user)
    throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password_hash);
  if(!valid) 
    throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "7d" });
  return { user, token };
}

module.exports = { register, login };