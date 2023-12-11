import express, {Router} from 'express';
const router: Router = express.Router();
import {
  allPets,
  getPets,
  addPet,
  getSinglePet,
  editPet,
  deletePet,
} from '../controllers/petController';

//Get all
router.route('/').get(allPets);

//Get all pets and add single pet for a specific user
router.route('/:butlerId').get(getPets).post(addPet);

//Get, edit and delete single pet
router.route('/:petId').get(getSinglePet).put(editPet).delete(deletePet);

export default router;
