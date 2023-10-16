import  {Request, Response,} from 'express';

//@desc Get all users
//@route GET /users
//@access public < Jungmee change this once you add authentication

export const getUsers = (req: Request, res: Response )=>{
  res.status(200).json({message: 'Get all users, love!'})
}

//@desc create 1 new user
//@route POST /users/:id
//@access public < Jungmee change this once you add authentication

export const createUser = (req: Request, res: Response )=>{
  res.status(201).json({message: 'Love, you created a new user!'})
}

//@desc get 1 user
//@route GET /users/:id
//@access public < Jungmee change this once you add authentication

export const getSingleUser = (req: Request, res: Response )=>{
  res.status(200).json({message: `Love, you got info for user ${req.params.id}`})
}

//@desc edit 1 existing user
//@route PUT /users/:id
//@access public < Jungmee change this once you add authentication

export const editUser = (req: Request, res: Response )=>{
  res.status(200).json({message: `Love, you sent updated info for user ${req.params.id}`})
}

//@desc delete 1 existing user
//@route DELETE /users/:id
//@access public < Jungmee change this once you add authentication

export const deleteUser = (req: Request, res: Response )=>{
  res.status(200).json({message: `Love, you deleted user ${req.params.id}`})
}


