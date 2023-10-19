import {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import {query} from '../db';

//@desc Get all users
//@route GET /users
//@access public < Jungmee change this once you add authentication

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await query('SELECT * FROM users');
  res.status(200).json(result.rows);
});

//@desc create 1 new user
//@route POST /users/
//@access public < Jungmee change this once you add authentication

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const {firstName, lastName, email} = req.body;

  if (!firstName || !lastName || !email) {
    res.status(400);
    throw new Error('All fields are mandatory to create a user.');
  }

  const queryText = `INSERT INTO users (first_name, last_name, email)
     VALUES ($1, $2, $3)
     RETURNING *;`;

  const values = [firstName, lastName, email];

  const result = await query(queryText, values);

  const returnMessage = result.rows[0];
  res.status(201).json({message: returnMessage});
});

//@desc get 1 user
//@route GET /users/:id
//@access public < Jungmee change this once you add authentication

export const getSingleUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const queryText = 'SELECT * FROM users WHERE user_id = $1';
  const result = await query(queryText, [id]);
  res.status(200).json({message: result.rows[0]});
};

//@desc edit 1 existing user
//@route PUT /users/:id
//@access public < Jungmee change this once you add authentication

export const editUser = asyncHandler(async (req: Request, res: Response) => {
  const {firstName, lastName, email} = req.body;

  if (!firstName && !lastName && !email) {
    res.status(400);
    throw new Error('No changed data was presented.');
  }

  const id = Number(req.params.id);

  const queryText = `
      UPDATE users
      SET first_name = $1, last_name = $2, email = $3
      WHERE user_id = $4
      RETURNING *;
    `;
  const result = await query(queryText, [firstName, lastName, email, id]);

  res.status(200).json({message: result.rows[0]});
});

//@desc delete 1 existing user
//@route DELETE /users/:id
//@access public < Jungmee change this once you add authentication

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const queryText = `
      DELETE from users
      WHERE user_id = $1
      RETURNING *;
    `;
  const result = await query(queryText, [id]);
  res.status(200).json({message: result.rows[0]});
});
