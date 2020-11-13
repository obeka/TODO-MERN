const express = require("express");
const mongoose = require("mongoose");

const Todo = require("../models/todo-model");
const User = require("../models/user-model");

const getATodoById = async (req, res, next) => {
  const todoId = req.params.todoId;
  let todo;
  try {
    todo = await Todo.findById(todoId);
  } catch (err) {
    res.status(500).send("Something went wrong, could not find the todo.");
  }

  res.json({ todo });
};

const addATodo = async (req, res, next) => {
  const { todoName, date, label } = req.body;
  const newTodo = new Todo({
    todoName,
    date,
    label,
    creator: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    res.status(500).send("Adding todo failed, please try again");
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newTodo.save({ session: sess });
    user.todos.push(newTodo);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    res.status(500).send("Adding todo failed, please try again.");
  }

  res.status(201).json({ newTodo });
};

const getTodosByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  let user;
  try {
    user = await User.findById(userId).populate("todos");
  } catch (error) {
    res.status(500).send("Fetching todo failed, please try again.");
  }

  res.json({
    todo: user.todos.map((todo) => todo.toObject({ getters: true })),
    user: user.toObject({ getters: true }),
  });
};

const updateATodo = async (req, res, next) => {
  const { todoName, date, label, isDone } = req.body;
  const todoId = req.params.todoId;
  let todo;
  try {
    todo = await Todo.findById(todoId);
  } catch (err) {
    res.status(500).send("Something went wrong, could not find the todo.");
  }
  if (todoName) {
    todo.todoName = todoName;
    todo.date = date;
    todo.label = label;
  } else {
    todo.isDone = isDone;
  }

  try {
    await todo.save();
  } catch (err) {
    res.status(500).send("Something went wrong, could not update the todo.");
  }

  res.status(200).json({ todo: todo.toObject({ getters: true }) });
};

const deleteATodo = async (req, res, next) => {
  const todoId = req.params.todoId;

  let todo;
  try {
    todo = await Todo.findById(todoId).populate("creator");
  } catch (err) {
    res.status(500).send("Something went wrong, could not delete todo.");
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await todo.remove({ session: sess });
    todo.creator.todos.pull(todo);
    await todo.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    res.status(500).send("Something went wrong, could not delete todo.");
  }

  res.status(200).json({ message: "Deleted todo." });
};

const deleteMany = async (req, res, next) => {
  const { userId, selected } = req.body;
  try {
    await Todo.deleteMany({ _id: { $in: selected } });
    res.status(200).json({ message: "Deleted todo(s)." });
  } catch (error) {
    res.status(500).send("Something went wrong, could not delete todosssss.");
  }
};

exports.getATodoById = getATodoById;
exports.addATodo = addATodo;
exports.getTodosByUserId = getTodosByUserId;
exports.updateATodo = updateATodo;
exports.deleteATodo = deleteATodo;
exports.deleteMany = deleteMany;
