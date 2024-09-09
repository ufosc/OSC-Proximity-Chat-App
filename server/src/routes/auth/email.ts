import { Router } from "express";
import Mailgun from "mailgun.js";

const authEmailRoute = Router();

authEmailRoute.post("/verify", async (req, res) => {
    let query = "";
    try {
      if (req.query.email) {
        query = "?email";
        const email = req.query.email; 
        const mailgun = new Mailgun(FormData);
        const mg = mailgun.client({
          username: "api",
          key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
        });
        const data = {
          from: "Mailgun Sandbox <postmaster@sandboxf8629624c26849cf8546cd0bc01ee862.mailgun.org>",
          to: email,
          subject: "Verify your email for echologator",
          template: "app email verification",
        };
        const verifyEmailResponse = await mg.messages.create(
          "sandboxf8629624c26849cf8546cd0bc01ee862.mailgun.org",
          data
        );
        console.log(`[EXP] Request <POST /verify${query}>returned successfully.`);
        res.json(verifyEmailResponse);
      }
    } catch (error) {
      console.error(
        `[EXP] Error returning request <POST /verify${query}>:\n`,
        error
      );
      res.json(`Operation <POST /verify${query}> failed.`);
    }
});

export default authEmailRoute;