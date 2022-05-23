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
    let subscription = {};
    // get client subscription config from db
    User.findOne({ _id: req.userId}).then(
      user =>{
        subscription = user.notification;
      }
    )
    

    const payload = {
      notification: {
        title: "Title",
        body: "This is my body",
        icon: "assets/icons/icon-384x384.png",
        actions: [
          { action: "bar", title: "Focus last" },
          { action: "baz", title: "Navigate last" },
        ],
        data: {
          onActionClick: {
            default: { operation: "openWindow" },
            bar: {
              operation: "focusLastFocusedOrOpen",
              url: "/signin",
            },
            baz: {
              operation: "navigateLastFocusedOrOpen",
              url: "/signin",
            },
          },
        },
      },
    };

    const options = {
      vapidDetails: {
        subject: "mailto:example_email@example.com",
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey,
      },
      TTL: 60,
    };

    // send notification
    webpush
      .sendNotification(subscription, JSON.stringify(payload), options)
      .then((_) => {
        console.log("SENT!!!");
        console.log(_);
      })
      .catch((_) => {
        console.log(_);
      });
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
  }).then(
    list => {
      res.status(200).send(list)
    }
  )
}

exports.createList = (req, res, next) => {
  const title = req.body.title;

  let newList = new List({
    title,
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
    {  _id: req.params.id },
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
