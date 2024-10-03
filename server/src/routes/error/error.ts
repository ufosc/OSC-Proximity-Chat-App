import { Router } from "express";

const errorRouter = Router();

errorRouter.get("*", (_, res) => {
  res.json("404: Path could not be found! COULD NOT {GET}");
  res.status(404);
});
  
errorRouter.post("*", (_, res) => {
  res.json("404: Path could not be found! COULD NOT {POST}");
  res.status(404);
});
  
errorRouter.put("*", (_, res) => {
  res.json("404: Path could not be found! COULD NOT {PUT}");
  res.status(404);
});
  
errorRouter.delete("*", (_, res) => {
  res.json("404: Path could not be found! COULD NOT {DELETE}");
  res.status(404);
});
  
export default errorRouter;
