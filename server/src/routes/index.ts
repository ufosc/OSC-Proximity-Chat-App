import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import errorRouter from "./error/error";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(userRouter);
mainRouter.use(errorRouter);

export default mainRouter;