import { Router } from "express";
import { findNearbyUsers, getConnectedUser } from "../../actions/getConnectedUsers";

const nearbyUserRoute = Router();

nearbyUserRoute.get("/users", async (req, res) => {
    let query = "";
    try {
      if (req.query.lat && req.query.lon && req.query.radius) {
        // Looks up all users close to a geographic location extended by a radius (in meters).
        query = "?lat&lon&radius";
  
        const lat = Number(req.query.lat);
        const lon = Number(req.query.lon);
        const radius = Number(req.query.radius);
  
        const userIds = await findNearbyUsers(lat, lon, radius);
        res.json(userIds);
      } else if (req.query.userId) {
        query = "?userId";
        const userId = req.query.userId;
        if (typeof userId != "string") throw Error("  [userId] is not a string.");
  
        const user = await getConnectedUser(userId);
        if (user) {
          res.json(user);
        } else {
          // getConnectedUserDisplayName() will return false is an error is thrown, and print it to console.
          throw Error("getConnectedUser() failed.");
        }
      }
    } catch (error) {
      console.error(
        `[EXP] Error returning request <GET /users${query}>:\n`,
        error.message
      );
      res.json(`Operation <GET /users${query}> failed.`);
    }
});

export default nearbyUserRoute;
