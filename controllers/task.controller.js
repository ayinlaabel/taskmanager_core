const express = require("express");
const webpush = require("web-push");
const dotenv = require("dotenv");
dotenv.config();

/**
 * @desc - Import mongoose model
 */
 const { List, Task } = require("../database/models");

exports.getTask = (req, res, next) => {
  Task.find({
    _listId: req.params.listId,
  })
    .then((tasks) => res.send(tasks))
    .catch((err) => console.log(err));
};

exports.getSingleTask = (req, res, next) => {
  Task.findOne({
    _listId: req.params.listId,
    _taskId: req.params.taskId,
  })
    .then((task) => res.status(200).send(task))
    .catch((err) => console.log(err));
};

exports.createTask = (req, res, next) => {
  let newTask = new Task({
    _listId: req.params.listId,
    title: req.body.title,
  });

  newTask
    .save()
    .then((newTask) => res.send(newTask))
    .catch((err) => console.log(err));
};

exports.editTask = (req, res, next) => {
  Task.findOneAndUpdate(
    {
      _listId: req.params.listId,
      _id: req.params.taskId,
    },
    {
      $set: req.body,
    }
  ).then((task) => res.send(task));
};

exports.deleteTask = (req, res, next) => {
  Task.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId,
  })
    .then((taskRemoved) => res.send(taskRemoved))
    .catch((err) => console.log(err));
};
