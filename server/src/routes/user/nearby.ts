import { Router } from "express";
import { findNearbyUsers, getConnectedUser } from "../../actions/getConnectedUsers";

const nearbyUserRoute = Router();

nearbyUserRoute.get("/users", async (req, res) => {
  if (req.query.lat && req.query.lon && req.query.radius) {
    // Looks up all users close to a geographic location extended by a radius (in meters).

    let lat: number, lon: number, radius: number;
    try {
      lat = Number(req.query.lat);
      lon = Number(req.query.lon);
      radius = Number(req.query.radius);
    } catch {
      console.error(
        `[EXP] Error returning request <GET ${req.url}>:\n\t`,
        "[lat/lon/radius] are not valid numbers."
      );
      res.status(400).json(`Operation <GET ${req.url}> failed.`);
      return;
    }

    let userIds;
    try {
      userIds = await findNearbyUsers(lat, lon, radius);
    } catch (error) {
      console.error(
        `[EXP] Error returning request <GET ${req.url}>:\n\t`,
        error.message
      );
      res.status(500).json(`Operation <GET ${req.url}> failed.`);
      return;
    }
    res.json(userIds);
  } else if (req.query.userId) {
    const userId = req.query.userId;
    if (typeof userId != "string") {
      console.error(
        `[EXP] Error returning request <GET ${req.url}>:\n\t`,
        "[userId] is not a valid string."
      );
      res.status(400).json(`Operation <GET ${req.url}> failed.`);
      return;
    }

    let user;
    try {
      user = await getConnectedUser(userId);
    } catch (error) {
      console.error(
        `[EXP] Error returning request <GET ${req.url}>:\n\t`,
        error.message
      );
      res.status(500).json(`Operation <GET ${req.url}> failed.`);
      return;
    }
    res.json(user);
  } else {
    console.error(
      `[EXP] Error returning request <GET ${req.url}>:\n\t`,
      "No valid target specification."
    );
    res.status(400).json(`Operation <GET ${req.url}> failed.`);
  }
});

export default nearbyUserRoute;
