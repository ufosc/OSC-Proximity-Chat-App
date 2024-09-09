import { Router } from "express";
import { deleteConnectedUserByUID } from "../../actions/deleteConnectedUser";

const deleteUserRoute = Router();

deleteUserRoute.post("/users", async (req, res) => {
    let query = "";
    try {
      query = "?userId";
      const userId = req.query.userId;
      if (typeof userId != "string") throw Error("  [userId] is not a string.");
  
      const success = await deleteConnectedUserByUID(userId);
      if (!success) throw Error("     deleteUserById() failed.");
  
      console.log(`[EXP] Request <DELETE /users${query}> returned successfully.`);
      res.json(`Operation <DELETE /users${query}> was handled successfully.`);
    } catch (error) {
      console.error(
        `[EXP] Error returning request <DELETE /users${query}>:\n`,
        error.message
      );
      res.json(`Operation <DELETE /user${query}> failed.`);
    }
});

export default deleteUserRoute;
