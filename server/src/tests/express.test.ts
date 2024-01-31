import {describe, expect, test} from '@jest/globals';

describe("Rest Tests", () => {
    test("Create user", async () => {
        const messageData = {
            displayName: "USERNAME",
            userId: "USERID",
            avatarUrl: "AVATARURL",
            lat: 100,
            lon: 100,
            geohash: "GEOHASH"
        }
        const response = await fetch('localhost:3001/users', {
            method: "POST",
            mode: "no-cors",
            headers: {
            "Content-Type": "application/json",
            },
            referrerPolicy: "same-origin",
            body: JSON.stringify(messageData),
        });
        console.log(response.json())
        // expect(response).toBe("Operation <POST /user> was handled successfully.")
    })

    // test("toggleConnection", async () => {
    //     const URL = "localhost:3001/users?userId=USERID\&toggleConnection=true"
    //     const response = await fetch(URL, {
    //         method: "PUT",
    //         mode: "no-cors",
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //         referrerPolicy: "same-origin",
    //         })
    //     expect(response).toBe("")

    // })

    // test("Update Location", async () => {
    //     const URL = "localhost:3001/users?userId=USERID\&lat=88\&lon=88"
    //     const response = await fetch(URL, {
    //         method: "PUT",
    //         mode: "no-cors",
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //         referrerPolicy: "same-origin",
    //         })
    //     expect(response).toBe("Operation <PUT /user?userId&lat&lon> was handled successfully.")
    // })

    // test("Delete user", async () => {
    //     const URL = "localhost:3001/users?userId=USERID"
    //     const response = await fetch(URL, {
    //         method: "DELETE",
    //         mode: "no-cors",
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //         referrerPolicy: "same-origin",
    //         })
    //     expect(response).toBe("Operation <DELETE /users?userId> was handled successfully.")
    // })
})