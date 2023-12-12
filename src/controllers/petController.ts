import {NextFunction, Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import {query} from '../db';

//@desc Get all pets for internal use
//@route GET /pets
export const allPets = asyncHandler(async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM pets');
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
  }
});

//@desc Get all pets of users
//@route GET /pets/:butlerId

export const getPets = asyncHandler(async (req: Request, res: Response) => {
  try {
    const butlerId = req.params.butlerId;
    console.log('lupin getpets hit,', butlerId);

    const queryText = `
    SELECT pets.*
    FROM pets
    JOIN users ON pets.auth0_sid = users.auth0_sid
    WHERE users.auth0_sid = $1;
  `;
    const result = await query(queryText, [butlerId]);

    res.status(200).json({message: result.rows});
  } catch (error) {
    console.log(error);
  }
});

//@desc add 1 new pet
//@route POST /pets/:butlerId

export const addPet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {
    petName,
    rfid = '',
    petType,
    breed = '',
    dob = 20231225,
    gender = 'Male',
    imageUrl = '',
  } = req.body;

  const butlerId = req.params.butlerId;
  if (!petName || !petType) {
    res.status(400);
    throw new Error('Pet name and type are necessary to create a pet profile.');
  }

  try {
    const queryText = `INSERT INTO pets (pet_name, rfid_chip_id, pet_type, breed, date_of_birth, gender, image_url, auth0_sid)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *;`;

    const values = [petName, rfid, petType, breed, dob, gender, imageUrl, butlerId];

    const result = await query(queryText, values);
    console.log('lupin result from add pet', result);
    const returnMessage = result.rows[0];
    res.status(201).json({message: returnMessage});
  } catch (error) {
    console.log('lupin error>', error);
    const castedError = error as Error;
    next(castedError);
  }
});

//@desc get 1 pet
//@route GET /pets/:petId

export const getSinglePet = async (req: Request, res: Response) => {
  const petId = Number(req.params.id);
  const queryText = 'SELECT * FROM pets WHERE pet_id = $1';
  const result = await query(queryText, [petId]);
  res.status(200).json({message: result.rows[0]});
};

//@desc edit 1 existing pet
//@route PUT /pets/:petId

export const editPet = asyncHandler(async (req: Request, res: Response) => {
  const {
    petName,
    rfid = '',
    petType,
    breed = '',
    dob = 20231225,
    gender = 'Male',
    imageUrl = '',
    butlerId,
  } = req.body;

  const petId = Number(req.params.id);

  const queryText = `
      UPDATE pets
      SET pet_name = $1, rfid_chip_id = $2, pet_type = $3, breed = $4, date_of_birth = $5, gender =$6, image_url = $7
      WHERE pet_id = $8
      RETURNING *;
    `;
  const result = await query(queryText, [
    petName,
    rfid,
    petType,
    breed,
    dob,
    gender,
    imageUrl,
    petId,
  ]);

  res.status(200).json({message: result.rows[0]});
});

//@desc delete 1 existing pet
//@route DELETE /pets/:petId

export const deletePet = asyncHandler(async (req: Request, res: Response) => {
  const petId = Number(req.params.id);

  const queryText = `
      DELETE from pets
      WHERE pet_id = $1
      RETURNING *;
    `;
  const result = await query(queryText, [petId]);
  res.status(200).json({message: result.rows[0]});
});
