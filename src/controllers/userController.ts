import {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';

//@desc Get all users
//@route GET /users
//@access public < Jungmee change this once you add authentication

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({message: 'Get all users, love!'});
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

  res.status(201).json({message: 'Love, you created a new user!'});
});

//@desc get 1 user
//@route GET /users/:id
//@access public < Jungmee change this once you add authentication

export const getSingleUser = async (req: Request, res: Response) => {
  res.status(200).json({message: `Love, you got info for user ${req.params.id}`});
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

  res.status(201).json({message: 'Love, you updated a user!'});
});

//@desc delete 1 existing user
//@route DELETE /users/:id
//@access public < Jungmee change this once you add authentication

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({message: `Love, you deleted user ${req.params.id}`});
});
