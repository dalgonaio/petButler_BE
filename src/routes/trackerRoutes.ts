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
router.route('/:petId').get(getAllFoodEntries).post(addFoodEntry);

//Get all food diaries for a single pet on single date
router.route('/:petId/:date').get(getSingleDateEntries);

//Get, edit and delete single pet
router.route('/:diaryId').put(editOneFoodEntry).delete(deleteFoodEntry);

export default router;
