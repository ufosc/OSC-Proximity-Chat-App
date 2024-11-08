import express from "express";
import usersRouter from "./routes/users/users";

export const startRESTServer = () => {
    const port = Number(process.env.express_port) ?? 8081;

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // TODO: ensure authorized

    const router = express.Router();
    
    router.all("/", (req, res) => {
        res.send("Echologator API")
        res.status(200);
    });

    router.all("*", (req, res) => {
        res.send("Path or method could not be found!");
        res.status(404);
    });

    // === REST APIs ===

    // PATH:    /users
    //   post   - creates a new user
    //   put    - updates an existing user
    //   delete - deletes a user
    //   get    - returns a user's public info
    router.use(usersRouter);

    //

    app.use(router);
    app.listen(port, () => {
        return console.log(
            `[EXP] Listening for requests at http://127.0.0.1:${port}.`
        );
    });
}