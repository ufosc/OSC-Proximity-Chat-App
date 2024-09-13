import { Router } from "express";
import { deleteConnectedUserByUID } from "../../actions/deleteConnectedUser";

const deleteUserRoute = Router();

deleteUserRoute.delete("/users", async (req, res) => {
  const userId = req.query.userId;
  if (typeof userId != "string") {
    console.error(
      `[EXP] Error returning request <DELETE ${req.url}>:\n\t`,
      "[userId] is not a string."
    );
    res.status(400).json(`Operation <DELETE ${req.url}> failed.`);
    return;
  }
  try {
    await deleteConnectedUserByUID(userId);
  } catch (error) {
    console.error(
      `[EXP] Error returning request <DELETE ${req.url}>:\n\t`,
      error.message
    );
    res.status(500).json(`Operation <DELETE ${req.url}> failed.`);
  }
  console.log(`[EXP] Request <DELETE ${req.url}> returned successfully.`);
  res.json(`Operation <DELETE ${req.url}> was handled successfully.`);
});

export default deleteUserRoute;
