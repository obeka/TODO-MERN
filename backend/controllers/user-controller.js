const express = require("express");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    res.status(500).send("Signing up failed, please try again later.");
  }

  if (!user) {
    res.status(422).send("You don't have account yet. Please sign up first!");
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    res.status(500).send("Could not log you in, please check your credentials and try again.");
  }
  if (!isValidPassword) {
    res.status(401).send("Invalid password, please check your password and try again.");
  }

  let token;
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      "todosaresecret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    res.status(500).send("Signing up failed, please try again later.");
  }

  res.status(200).json({
    userId: user.id,
    email: user.email,
    token: token,
    username: user.username
  });
};

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    res.status(500).send("Signing up failed, please try again later.");
  }
  if (existingUser) {
    res.status(422).send("User is already exist! Please sign in!");
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    res.status(500).send("Could not create user, please try again.");
  }
  const createdUser = new User({
    username,
    email,
    password: hashedPassword,
    todos: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    res.status(500).send("Signing up failed, please try again later.");
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "todosaresecret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    res.status(500).send("Signing up failed, please try again later.");
  }
  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
    username: createdUser.username
  });
};

exports.login = login;
exports.signup = signup;
