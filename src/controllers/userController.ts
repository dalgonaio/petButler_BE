import {NextFunction, Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import {query} from '../db';

//@desc Get all users
//@route GET /users

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await query('SELECT * FROM users');
  res.status(200).json(result.rows);
});

//@desc create 1 new user
//@route POST /users/

export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {firstName, lastName, email, auth0Id} = req.body;

  //Remove "auth0|" from auth0Id
  const formattedAuth0Id = auth0Id.slice(7);

  if (!firstName || !lastName || !email) {
    res.status(400);
    throw new Error('All fields are mandatory to create a user.');
  }

  try {
    const queryText = `INSERT INTO users (first_name, last_name, email, auth0_sid)
     VALUES ($1, $2, $3, $4)
     RETURNING *;`;

    const values = [firstName, lastName, email, formattedAuth0Id];

    const result = await query(queryText, values);

    const returnMessage = result.rows[0];
    res.status(201).json({message: returnMessage});
  } catch (error) {
    const castedError = error as Error;
    if (castedError.message.includes('duplicate key value violates unique constraint')) {
      // Handle duplicate email error
      res.status(400).json({message: 'Email is already in use.'});
    } else {
      next(castedError);
    }
  }
});

//@desc get 1 user
//@route GET /users/:id

export const getSingleUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const queryText = 'SELECT * FROM users WHERE user_id = $1';
  const result = await query(queryText, [id]);
  res.status(200).json({message: result.rows[0]});
};

//@desc edit 1 existing user
//@route PUT /users/:id

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

//@desc check if user with Auth0 Id exists
//@route GET /users/check/:auth0Id

export const getUserAuth0Id = asyncHandler(async (req: Request, res: Response) => {
  const auth0Id = req.params.id;
  console.log('lupin get user hit>', auth0Id, req);

  const queryText = 'SELECT * FROM users WHERE auth0_sid = $1';
  const result = await query(queryText, [auth0Id]);
  res.status(200).json({message: result.rows[0]});
});
