import { Response } from "express";
import request from "supertest";
import app from '../src/app';
import * as getMessagesApi from "../src/actions/getMessages";
import * as postMessagesApi from "../src/actions/createMessage";
import * as deleteMessagesApi from "../src/actions/deleteMessage";

import { GET_ALL_MESSAGES_EXPECTED_DATA, 
         GET_MESSAGE_BY_ID_EXPECTED_DATA,
         GET_MESSAGE_BY_BROAD_COORDINATES_AND_TIME_EXPECTED_DATA,
         GET_MESSAGE_BY_BROAD_COORDINATES_EXPECTED_DATA,
         POST_MESSAGE_WITH_CORRECT_DATA_FORMAT,
         POST_MESSAGE_WITH_INCORRECT_DATA_FORMAT,
         CORRECT_MESSAGE_ID,
         INCORRECT_MESSAGE_ID
        } from "./data/messagesData";

describe("Test the message routes", () => {
    describe("Test GET requests", () => {
        test("It should respond to a GET request having no parameter with all the messages", async () => {
            jest.spyOn(getMessagesApi, 'getMessages').mockResolvedValue(GET_ALL_MESSAGES_EXPECTED_DATA);
            const res = await request(app).get("/messages");
            expect(res.type).toEqual("application/json");
            expect(res.body).toEqual(GET_ALL_MESSAGES_EXPECTED_DATA);
        });

        test("It should respond to a GET request having msgId parameter with a message having id msgId", async () => {
            jest.spyOn(getMessagesApi, 'getMessageById').mockResolvedValue(GET_MESSAGE_BY_ID_EXPECTED_DATA);
            const msgId = GET_MESSAGE_BY_ID_EXPECTED_DATA.msgId;
            const res = await request(app).get(`/messages?msgId=${msgId}`);
            expect(res.type).toEqual("application/json");
            expect(res.body).toEqual(GET_MESSAGE_BY_ID_EXPECTED_DATA);
        });

        test("It should respond to a GET request having broad coordinates and time with a message having matching values", async () => {
            jest.spyOn(getMessagesApi, 'getMessagesByBroadCoordsAndTime').mockResolvedValue(GET_MESSAGE_BY_BROAD_COORDINATES_AND_TIME_EXPECTED_DATA);
            const broadLat = GET_MESSAGE_BY_BROAD_COORDINATES_AND_TIME_EXPECTED_DATA[0].broadLat;
            const broadLon = GET_MESSAGE_BY_BROAD_COORDINATES_AND_TIME_EXPECTED_DATA[0].broadLon;
            const timeSent = GET_MESSAGE_BY_BROAD_COORDINATES_AND_TIME_EXPECTED_DATA[0].timeSent;

            const res = await request(app).get(`/messages?broadLat=${broadLat}&broadLon=${broadLon}&secondsSinceCreation=${timeSent}`);
            expect(res.type).toEqual("application/json");
            expect(res.body).toEqual(GET_MESSAGE_BY_BROAD_COORDINATES_AND_TIME_EXPECTED_DATA);
        });

        test("It should respond to a GET request having broad coordinates with a message having matching values", async () => {
            jest.spyOn(getMessagesApi, 'getMessagesByBroadCoordinates').mockResolvedValue(GET_MESSAGE_BY_BROAD_COORDINATES_EXPECTED_DATA);
            const broadLat = GET_MESSAGE_BY_BROAD_COORDINATES_AND_TIME_EXPECTED_DATA[0].broadLat;
            const broadLon = GET_MESSAGE_BY_BROAD_COORDINATES_AND_TIME_EXPECTED_DATA[0].broadLon;

            const res = await request(app).get(`/messages?broadLat=${broadLat}&broadLon=${broadLon}`);
            expect(res.type).toEqual("application/json");
            expect(res.body).toEqual(GET_MESSAGE_BY_BROAD_COORDINATES_EXPECTED_DATA);
        });
    });

    describe("Test POST requests", () => {
        test("It should successfully respond to a POST request with correct data format", async () => {
            jest.spyOn(postMessagesApi, 'createMessage')
            const res = await request(app).post("/messages").send(POST_MESSAGE_WITH_CORRECT_DATA_FORMAT);
            expect(res.type).toEqual("application/json");
            expect(res.body).toBe(true);
        });

        test("It should respond with error to a POST request with incorrect data format", async () => {
            jest.spyOn(postMessagesApi, 'createMessage')
            const res = await request(app).post("/messages").send(POST_MESSAGE_WITH_INCORRECT_DATA_FORMAT);
            expect(res.type).toEqual("application/json");
            expect(res.body).toBe(false);
        });
    });

    describe("Test DELETE requests", () => {
        test("It should successfully respond to a DELETE request with correct msgId", async () => {
            jest.spyOn(deleteMessagesApi, 'deleteMessageById').mockResolvedValue(true);
            const res = await request(app).delete(`/messages?msgId=${CORRECT_MESSAGE_ID}`);
            expect(res.type).toEqual("application/json");
            expect(res.body).toBe(true);
        });

        test("It should respond with error to a DELETE request with incorrect msgId", async () => {
            jest.spyOn(deleteMessagesApi, 'deleteMessageById').mockResolvedValue(false);
            const res = await request(app).delete(`/messages?msgId=${INCORRECT_MESSAGE_ID}`);
            expect(res.type).toEqual("application/json");
            expect(res.body).toBe(false);
        });

        test("It should respond with error to a DELETE request with no msgId", async () => {
            jest.spyOn(deleteMessagesApi, 'deleteMessageById').mockResolvedValue(false);
            const res = await request(app).delete("/messages");
            expect(res.type).toEqual("application/json");
            expect(res.body).toBe(false);
        });
    });

    describe("Test PUT requests", () => {
        test("It should respond with error to a PUT request", async () => {
            const res = await request(app).put('/messages');
            expect(res.type).toEqual("application/json");
            expect(res.body).toBe(false);
        });
    })
});