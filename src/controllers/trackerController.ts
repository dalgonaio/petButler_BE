import {NextFunction, Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import {query} from '../db';

//@desc Get all petFood entries for 1 pet
//@route GET /petFood/:petId

export const getAllFoodEntries = asyncHandler(async (req: Request, res: Response) => {
  try {
    const petId = Number(req.params.petId);

    const queryText = `
    SELECT pets_food.*
    FROM pets_food
    WHERE pet_id = $1;
  `;
    const result = await query(queryText, [petId]);

    res.status(200).json({message: result.rows});
  } catch (error) {
    console.log(error);
  }
});

//@desc add 1 new calorie entry
//@route POST /petFood/:petId

export const addFoodEntry = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      date = '',
      foodType = '',
      foodBrand = '',
      portionSize = 1,
      caloriesPerPortion = 0,
      portionsConsumed,
    } = req.body;

    const petId = Number(req.params.petId);

    if (!petId || !date) {
      res.status(400);
      throw new Error('Pet Id and date are necessary to create a food entry');
    }

    try {
      const queryText = `INSERT INTO pets_food (intake_date_time, pet_id,food_type, food_brand, portion_size, portions_consumed, calories_per_portion, total_calories_consumed)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;`;

      const totalCalories = portionsConsumed * caloriesPerPortion;
      const values = [
        date,
        petId,
        foodType,
        foodBrand,
        portionSize,
        portionsConsumed,
        caloriesPerPortion,
        totalCalories,
      ];

      const result = await query(queryText, values);
      const returnMessage = result.rows[0];
      res.status(201).json({message: returnMessage});
    } catch (error) {
      console.log('lupin error>', error);
      const castedError = error as Error;
      next(castedError);
    }
  }
);

//@desc get all entries for 1 date
//@route GET /petFood/:petId

export const getSingleDateEntries = async (req: Request, res: Response) => {
  const petId = Number(req.params.id);
  const date = req.body;
  const queryText = 'SELECT * FROM pets_food WHERE pet_id = $1 AND intake_date_time = $2';
  const result = await query(queryText, [petId, date]);
  res.status(200).json({message: result.rows});
};

//@desc edit 1 diary entry
//@route PUT /petFood/:diaryId

export const editOneFoodEntry = asyncHandler(async (req: Request, res: Response) => {
  const {
    foodType = '',
    foodBrand = '',
    portionSize = 1,
    caloriesPerPortion = 0,
    portionsConsumed,
  } = req.body;

  const diaryId = Number(req.params.diaryId);
  const totalCalories = caloriesPerPortion * portionsConsumed;

  const queryText = `
      UPDATE pets_food
      SET food_type = $1, food_brand = $2, portion_size = $3, portions_consumed =$4, calories_per_portion = $5, total_calories_consumed = $6
      WHERE intake_id = $7
      RETURNING *;
    `;

  const result = await query(queryText, [
    foodType,
    foodBrand,
    portionSize,
    portionsConsumed,
    caloriesPerPortion,
    totalCalories,
    diaryId,
  ]);

  res.status(200).json({message: result.rows[0]});
});

//@desc delete 1 entry
//@route DELETE /petFood/:diaryId

export const deleteFoodEntry = asyncHandler(async (req: Request, res: Response) => {
  const diaryId = Number(req.params.diaryId);

  const queryText = `
      DELETE from pets_food
      WHERE intake_id = $1
      RETURNING *;
    `;
  const result = await query(queryText, [diaryId]);
  res.status(200).json({message: result.rows[0]});
});
