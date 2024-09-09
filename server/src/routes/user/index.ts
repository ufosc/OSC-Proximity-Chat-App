import { Router } from "express";
import createUserRoute from "./create";
import deleteUserRoute from "./delete";
import getNearbyUserRoute from "./getNearby";
import updateUserRoute from "./update";

const userRouter = Router();


userRouter.use(createUserRoute);
userRouter.use(deleteUserRoute);
userRouter.use(getNearbyUserRoute);
userRouter.use(updateUserRoute);


export default userRouter;
