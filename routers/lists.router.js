const express = require("express");
const webpush = require("web-push");
const dotenv = require('dotenv');
dotenv.config();

const auth = require("../auth/index.auth");

const router = express.Router();

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY
};

/**
 * @desc - Import mongoose model
 */
const { List, Task } = require("../database/models");

/**
 * Get /lists
 * @desc - This get all the lists
 */
router.get("/", auth.verifyToken, (req, res, next) => {
  if (req.userId) {
    // get client subscription config from db
    const subscription = {
      endpoint: "",
      expirationTime: null,
      keys: {
        auth: "",
        p256dh: "",
      },
    };

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
});

/**
 * POST /lists
 * @desc - This create a new list
 */
router.post("/", auth.verifyToken, (req, res, next) => {
  const title = req.body.title;

  let newList = new List({
    title,
    _userId: req.userId,
  });

  newList
    .save()
    .then((list) => res.status(201).send(list))
    .catch((err) => console.log(err));
});

/**
 * Patch /lists/:id
 * @desc - This update the list by its unique _id
 */
router.patch("/:id", auth.verifyToken, (req, res, next) => {
  /**
   * @desc This will update the document with the data send from the req.body
   */

  List.findOneAndUpdate(
    { _userId: req.userId, _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => res.status(202));
});

/**
 * Delete /lists/:id
 * @desc - This delete list by its unique _id
 */
router.delete("/:id", auth.verifyToken, (req, res, next) => {
  List.findOneAndRemove({
    _userId: req.userId,
    _id: req.params.id,
  })
    .then((listRemoved) => res.status(200).send(listRemoved))
    .catch((err) => console.log(err));
});

/**
 * TASK
 */

/**
 * GET /lists/:listId/task
 * @desc - This get all task that belongs to a specific list
 */
router.get("/:listId/tasks", auth.verifyToken, (req, res, next) => {
  Task.find({
    _listId: req.params.listId,
  })
    .then((tasks) => res.send(tasks))
    .catch((err) => console.log(err));
});

/**
 * GET /lists/:listId/task/:taskId
 * @desc - This get single task that belongs to a specific listId and taskId
 */
router.get("/:listId/tasks/:taskId", auth.verifyToken, (req, res, next) => {
  Task.findOne({
    _listId: req.params.listId,
    _taskId: req.params.taskId,
  })
    .then((task) => res.status(200).send(task))
    .catch((err) => console.log(err));
});

/**
 * POST /lists/:listId/task
 * @desc - this create a new task for a specific list
 */
router.post("/:listId/tasks", auth.verifyToken, (req, res, next) => {
  let newTask = new Task({
    _listId: req.params.listId,
    title: req.body.title,
  });

  newTask
    .save()
    .then((newTask) => res.send(newTask))
    .catch((err) => console.log(err));
});

/**
 * PATCH /lists/:listId/task/:taskId
 * @desc - This will update the task with the specific ID
 */
router.patch("/:listId/tasks/:taskId", auth.verifyToken, (req, res, next) => {
  Task.findOneAndUpdate(
    {
      _listId: req.params.listId,
      _id: req.params.taskId,
    },
    {
      $set: req.body,
    }
  ).then((task) => res.send(task));
});

/**
 * Delete /lists/:listId/task/:taskId
 * @desc - This delete task by its unique taskId and the listId
 */
router.delete("/:listId/tasks/:taskId", auth.verifyToken, (req, res, next) => {
  Task.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId,
  })
    .then((taskRemoved) => res.send(taskRemoved))
    .catch((err) => console.log(err));
});

/**
 * @desc - this get single task by id
 */
/**
 * GET /lists/:listId/task/:taskId
 * @desc - This get all task that belongs to a specific list
 */
router.get(
  "/lists/:listId/tasks/:taskId",
  auth.verifyToken,
  (req, res, next) => {
    Task.findOne({
      _listId: req.params.listId,
      _id: req.params.taskId,
    })
      .then((task) => res.send(task))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
