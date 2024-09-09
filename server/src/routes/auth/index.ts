import { Router } from "express";
import authUserEmailRoute from "./email";

const authRouter = Router();


authRouter.use(authUserEmailRoute);


export default authRouter;