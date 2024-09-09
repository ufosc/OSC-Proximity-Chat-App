import { Router } from "express";
import authEmailRoute from "./email";

const authRouter = Router();


authRouter.use(authEmailRoute);


export default authRouter;