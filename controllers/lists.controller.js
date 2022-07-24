const express = require("express");
const webpush = require("web-push");
const dotenv = require("dotenv");
dotenv.config();

/**
 * @desc - Import mongoose model
 */
const { List, Task, User } = require("../database/models");

exports.getList = (req, res, next) => {
  if (req.userId) {
    List.find({ _userId: req.userId })
      .then((lists) => {
        res.status(200).send(lists);
      })
      .catch((err) => console.log(err));
  }
};

exports.getSingleList = (req, res, next) => {
  List.findOne({
    _id: req.params.id,
  }).then((list) => {
    res.status(200).send(list);
  });
};

exports.createList = (req, res, next) => {
  const { title, reminder, reminderDate, reminderTime } = req.body;

  let newList = new List({
    title,
    reminder,
    reminderDate,
    reminderTime,
    _userId: req.userId,
  });

  newList
    .save()
    .then((list) => res.status(201).send(list))
    .catch((err) => console.log(err));
};

exports.editList = (req, res, next) => {
  /**
   * @desc This will update the document with the data send from the req.body
   */

  List.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then((list) => res.status(202).send(list));
};

exports.deleteList = (req, res, next) => {
  List.findOneAndRemove({
    _userId: req.userId,
    _id: req.params.id,
  })
    .then((listRemoved) => res.status(200).send(listRemoved))
    .catch((err) => console.log(err));
};
