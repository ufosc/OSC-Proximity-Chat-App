import { Router } from "express";
import {
  toggleUserConnectionStatus,
  updateUserDisplayName,
  updateUserLocation
} from "../../actions/updateConnectedUser";

const updateUserRoute = Router();

updateUserRoute.put("/users", async (req, res) => {
  const baseErrorMsg = `[EXP] Error processing request <PUT ${req.url}>:\n\t`;
  let userId = null;
  if (req.query.userId) {
    userId = req.query.userId;
    if (typeof userId != "string") {
      console.error(baseErrorMsg, "Invalid [userId].");
      res.status(400).json(`Operation <PUT ${req.url}> failed.`);
      return;
    }
  }
  if (req.query.userId && req.query.toggleConnection) {
    // Note: toggleConnection should be assigned 'true', but it at least
    // needs to contain any value. We don't perform a check on this
    // parameter for this reason.
    try {
      await toggleUserConnectionStatus(userId);
    } catch (error) {
      console.error(baseErrorMsg, error.message);
      res.status(500).json(`Operation <PUT ${req.url}> failed.`);
      return;
    }
    res.json("Operation <PUT /users?userId&toggleConnection> was handled successfully.");
  } else if (req.query.userId && req.query.lat && req.query.lon) {
    let lat: number, lon: number;
    try {
      lat = Number(req.query.lat);
      lon = Number(req.query.lon);
    } catch {
      console.error(baseErrorMsg, "[lat/lon] are not valid numbers.");
      res.status(400).json(`Operation <PUT ${req.url}> failed.`);
      return;
    }

    try {
      await updateUserLocation(userId, lat, lon);
    } catch (error) {
      console.error(baseErrorMsg, error.message);
      res.status(500).json(`Operation <PUT ${req.url}> failed.`);
      return;
    }
    res.json("Operation <PUT /user?userId&lat&lon> was handled successfully.");
  } else if (req.query.userId && req.query.displayName) {
    const displayName = req.query.displayName;
    if (typeof displayName != "string") {
      console.error(baseErrorMsg, "Invalid [displayName].");
      res.status(400).json(`Operation <PUT ${req.url}> failed.`);
      return;
    }
    try {
      await updateUserDisplayName(userId, displayName);
    } catch (error) {
      console.error(baseErrorMsg, error.message);
      res.status(500).json(`Operation <PUT ${req.url}> failed.`);
      return;
    }
    res.json("Operation <PUT /user?userId&displayName> was handled successfully.");
  } else {
    console.error(
      `[EXP] Error returning request <PUT ${req.url}>:\n\t`,
      "No valid target specification."
    );
    res.status(400).json(`Operation <PUT ${req.url}> failed.`);
    return;
  }
  console.log(`[EXP] Request <PUT ${req.url}> returned successfully.`);
});

export default updateUserRoute;
