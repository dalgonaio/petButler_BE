import express, {Router} from 'express';
const router: Router = express.Router();
import {
  getAllFoodEntries,
  addFoodEntry,
  getSingleDateEntries,
  editOneFoodEntry,
  deleteFoodEntry,
} from '../controllers/trackerController';

//Get all food diaries and add single food entry for a specific pet
router.route('/:petId').get(getAllFoodEntries).get(getSingleDateEntries).post(addFoodEntry);

//Get, edit and delete single pet
router.route('/:diaryId').put(editOneFoodEntry).delete(deleteFoodEntry);

export default router;
