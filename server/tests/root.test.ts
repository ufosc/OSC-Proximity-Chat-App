import request from "supertest";
import app from "../src/app";

describe("Test the root path", () => {
    test("It should respond correctly to a GET request", async () => {
        const res = await request(app)
                 .get("/");
        expect(res.text).toEqual("Hello World!");
        expect(res.statusCode).toBe(200); 
    });

    test("It should respond with an error to a POST request", async () => {
        const res = await request(app)
                 .post("/");
        expect(res.body).toBe(false);
        expect(res.type).toEqual("application/json");
        expect(res.statusCode).toBe(200); //TODO: need to fix test to pass when status code is 404
    })

    test("It should respond with an error to a PUT request", async () => {
        const res = await request(app)
                 .put("/");
        expect(res.body).toBe(false);
        expect(res.type).toEqual("application/json");
        expect(res.statusCode).toBe(200); //TODO: need to fix test to pass when status code is 404
    });
});