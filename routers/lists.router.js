const express = require("express");

const router = express.Router();

/**
 * @desc - Import mongoose model
 */
const { List, Task } = require("../database/models");

/**
 * Get /lists
 * @desc - This get all the lists
 */
router.get("/", (req, res, next) => {
  List.find({})
    .then((lists) => {
      res.send(lists);
    })
    .catch((err) => console.log(err));
});

/**
 * POST /lists
 * @desc - This create a new list
 */
router.post("/", (req, res, next) => {
  const title = req.body.title;

  let newList = new List({
    title,
  });

  newList
    .save()
    .then((list) => res.send(list))
    .catch((err) => console.log(err));
});

/**
 * Patch /lists/:id
 * @desc - This update the list by its unique _id
 */
router.patch("/:id", (req, res, next) => {
  /**
   * @desc This will update the document with the data send from the req.body
   */

  List.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => res.sendStatus(200));
});

/**
 * Delete /lists/:id
 * @desc - This delete list by its unique _id
 */
router.delete("/:id", (req, res, next) => {
  List.findOneAndRemove({
    _id: req.params.id,
  })
    .then((listRemoved) => res.send(listRemoved))
    .catch((err) => console.log(err));
});

/**
 * TASK
 */

/**
 * GET /lists/:listId/task
 * @desc - This get all task that belongs to a specific list
 */
router.get("/:listId/tasks", (req, res, next) => {
  Task.find({
    _listId: req.params.listId,
  })
    .then((tasks) => res.send(tasks))
    .catch((err) => console.log(err));
});

/**
 * POST /lists/:listId/task
 * @desc - this create a new task for a specific list
 */
router.post("/:listId/tasks", (req, res, next) => {
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
router.patch("/:listId/tasks/:taskId", (req, res, next) => {
  Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      _listId: req.params.listId,
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
router.delete("/:listId/tasks/:taskId", (req, res, next) => {
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
router.get("/lists/:listId/tasks/:taskId", (req, res, next) => {
  Task.findOne({
    _listId: req.params.listId,
    _id: req.params.taskId,
  })
    .then((task) => res.send(task))
    .catch((err) => console.log(err));
});

module.exports = router;
