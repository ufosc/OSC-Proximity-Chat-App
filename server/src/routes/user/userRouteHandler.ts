import { Router } from "express";
import createUserRoute from "./create";
import deleteUserRoute from "./delete";
import updateUserRoute from "./update";
import nearbyUserRoute from "./nearby";

const userRouter = Router();


userRouter.use(createUserRoute);
userRouter.use(deleteUserRoute);
userRouter.use(nearbyUserRoute);
userRouter.use(updateUserRoute);


export default userRouter;
