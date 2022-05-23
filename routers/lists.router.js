const express = require("express");

const listCtrl = require("../controllers/lists.controller");
const taskCtrl = require("../controllers/task.controller");

const auth = require("../auth/index.auth");

const router = express.Router();

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

/**
 * Get /lists
 * @desc - This get all the lists
 */
router.get("/", auth.verifyToken, listCtrl.getList);

/**
 * Get /lists
 * @desc - This get single lists by id
 */
router.get("/:id", auth.verifyToken, listCtrl.getSingleList);

/**
 * POST /lists
 * @desc - This create a new list
 */
router.post("/", auth.verifyToken, listCtrl.createList);

/**
 * Patch /lists/:id
 * @desc - This update the list by its unique _id
 */
router.patch("/:id", auth.verifyToken, listCtrl.editList);

/**
 * Delete /lists/:id
 * @desc - This delete list by its unique _id
 */
router.delete("/:id", auth.verifyToken, listCtrl.deleteList);

/**
 * TASK
 */

/**
 * GET /lists/:listId/task
 * @desc - This get all task that belongs to a specific list
 */
router.get("/:listId/tasks", auth.verifyToken, taskCtrl.getTask);

/**
 * GET /lists/:listId/task/:taskId
 * @desc - This get single task that belongs to a specific listId and taskId
 */
router.get("/:listId/tasks/:taskId", auth.verifyToken, taskCtrl.getSingleTask);

/**
 * POST /lists/:listId/task
 * @desc - this create a new task for a specific list
 */
router.post("/:listId/tasks", auth.verifyToken, taskCtrl.createTask);

/**
 * PATCH /lists/:listId/task/:taskId
 * @desc - This will update the task with the specific ID
 */
router.patch("/:listId/tasks/:taskId", auth.verifyToken, taskCtrl.editTask);

/**
 * Delete /lists/:listId/task/:taskId
 * @desc - This delete task by its unique taskId and the listId
 */
router.delete("/:listId/tasks/:taskId", auth.verifyToken, taskCtrl.deleteTask);

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
