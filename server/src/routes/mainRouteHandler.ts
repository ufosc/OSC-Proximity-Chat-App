import { Router } from "express";
import authRouter from "./auth/authRouteHandler";
import userRouter from "./user/userRouteHandler";
import errorRouter from "./error/error";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(userRouter);
mainRouter.use(errorRouter);

export default mainRouter;