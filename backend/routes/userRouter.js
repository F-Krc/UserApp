import express from "express";
import * as user from "../controllers/userController.js";

const userRouter = express.Router();

userRouter
  .post('/user/register', user.createUserController)
  .post('/user/login', user.loginUserController)
  .get('/user/userslist', user.findUserController)
  .put('/user/update/:id', user.updateUserController)
  .delete('/user/remove/:id', user.deleteUserController);


export default userRouter;
