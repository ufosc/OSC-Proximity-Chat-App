import { Router } from "express";
import { createUser } from "../../actions/createConnectedUser";

const createUserRoute = Router();

createUserRoute.post("/users", async (req, res) => {
    try {
      const status = await createUser({
        uid: req.body.uid,
        socketId: req.body.socketId,
        location: {
          lat: Number(req.body.location.lat),
          lon: Number(req.body.location.lon),
          geohash: req.body.location.geohash,
        },
      });
      if (status === false) throw new Error("Error creating user: ");
      res.json("Operation <POST /user> was handled successfully.");
      console.log("[EXP] Request <POST /users> returned successfully.");
    } catch (error) {
      console.error(
        "[EXP] Error returning request <POST /users>:\n",
        error.message
      );
      res.json(`Operation <POST /user> failed.`);
    }
});

export default createUserRoute;