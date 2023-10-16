import express, {Router} from 'express';
const router:Router = express.Router();
import {getUsers, createUser, getSingleUser, editUser, deleteUser} from '../controllers/userController';

//Get all
router.route('/')
  .get(getUsers);

//Get, create, edit, delete specific user
router.route('/:id')
  .get(getSingleUser)
  .post(createUser)
  .put(editUser)
  .delete(deleteUser);


export default router;
