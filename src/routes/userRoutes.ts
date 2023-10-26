import express, {Router} from 'express';
const router: Router = express.Router();
import {
  getUsers,
  createUser,
  getSingleUser,
  editUser,
  deleteUser,
  getUserAuth0Id,
} from '../controllers/userController';

//Get all
router.route('/').get(getUsers).post(createUser);

//Get, create, edit, delete specific user
router.route('/:id').get(getSingleUser).put(editUser).delete(deleteUser);

//Get specific user by auth0 id
router.route('/check/:id').get(getUserAuth0Id);

export default router;
