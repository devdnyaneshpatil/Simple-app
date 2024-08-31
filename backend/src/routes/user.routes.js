const {
  getOneUserController,
  getAllUsersController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controllers");
const auth = require("../middlewares/auth.middleware");

const userRouter = require("express").Router();

userRouter.get("/",auth, getAllUsersController);
userRouter.get("/:id", auth, getOneUserController);
userRouter.patch("/:id", auth, updateUserController).delete("/:id", auth, deleteUserController);

module.exports = userRouter;
