import express, {Request, Response, Router} from 'express';

const router:Router = express.Router();

router.route('/')
  .get((req:Request, res:Response)=>{
    res.status(200).json({message: 'Hello, love!'})
  })
  .post((req: Request, res: Response)=>{
    res.send('Love, did you send a POST request?')
  })

router.route('/')

export default router;
