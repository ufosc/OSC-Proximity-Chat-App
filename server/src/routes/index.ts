import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";

const userAndAuthRouter = Router();

userAndAuthRouter.use(authRouter);
userAndAuthRouter.use(userRouter);

export default userAndAuthRouter;