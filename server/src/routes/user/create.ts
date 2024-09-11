import { Router } from "express";
import { createUser } from "../../actions/createConnectedUser";

const createUserRoute = Router();

createUserRoute.post("/users", async (req, res) => {
  let status: boolean;
  try {
    status = await createUser({
      uid: req.body.uid,
      socketId: req.body.socketId,
      displayName: req.body.displayName,
      userIcon: {
        foregroundImage: req.body.userIcon.foregroundImage,
        backgroundImage: req.body.userIcon.backgroundImage,
      },
      location: {
        lat: Number(req.body.location.lat),
        lon: Number(req.body.location.lon),
        geohash: req.body.location.geohash,
      },
    });
  } catch (error) {
    console.error(
      "[EXP] Error returning request <POST /users>:\n",
      error.message
    );
    res.status(500).json(`Operation <POST /user> failed.`);
  }
  if (!status) {
    console.log("[EXP] Request <POST /users> returned successfully.");
    res.json("Operation <POST /user> was handled successfully.");
  } else {
    console.error("[EXP] Error returning request <POST /users>:\n");
    res.status(500).json(`Operation <POST /user> failed.`);
  }
});

export default createUserRoute;
