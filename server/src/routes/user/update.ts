import { Router } from "express";
import { toggleUserConnectionStatus, updateUserDisplayName, updateUserLocation } from "../../actions/updateConnectedUser";

const updateUserRoute = Router();

updateUserRoute.put("/users", async (req, res) => {
    let query = "";
    try {
      if (req.query.userId && req.query.toggleConnection) {
        // Note: toggleConnection should be assigned 'true', but it at least needs to contain any value. We don't perform a check on this parameter for this reason.
        query = "?userId&toggleConnection";
        const userId = req.query.userId;
        if (typeof userId != "string") throw Error("  [userId] is not a string.");
  
        const success = await toggleUserConnectionStatus(userId);
        if (!success) throw Error("     toggleUserConnectionStatus() failed.");
      } else if (req.query.userId && req.query.lat && req.query.lon) {
        query = "?userId&lat&lon";
        const userId = req.query.userId;
        const lat = Number(req.query.lat);
        const lon = Number(req.query.lon);
        if (typeof userId != "string") throw Error("  [userId] is not a string.");
        if (typeof lat != "number") throw Error("  [lat] is not a number.");
        if (typeof lon != "number") throw Error("  [lon] is not a number.");
  
        const success = await updateUserLocation(userId, lat, lon);
        if (!success) throw Error("     toggleUserConnectionStatus() failed.");
      } else if (req.query.userId && req.query.displayName) {
        query = "?userId&displayName";
        const userId = req.query.userId;
        if (typeof userId != "string") throw Error("  [userId] is not a string.");
        const displayName = req.query.displayName;
        if (typeof displayName != "string")
          throw Error("  [displayName] is not a string.");
  
        const success = await updateUserDisplayName(userId, displayName);
        if (!success) throw Error("updateDisplayName() failed.");
      }
      console.log(`[EXP] Request <PUT /users${query}> returned successfully.`);
      res.json(`Operation <PUT /users${query}> was handled successfully.`);
    } catch (error) {
      console.error(
        `[EXP] Error returning request <PUT /users${query}>:\n`,
        error.message
      );
      res.json(`Operation <PUT /user${query}> failed.`);
    }
  });

export default updateUserRoute;