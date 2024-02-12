import {describe, expect, test} from '@jest/globals';
import axios from 'axios';

async function RestPost(messageData: any) {
    try {
      const response = await axios.post('http://localhost:3001/users', messageData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  

jest.mock('axios')

describe('Rest tests', () => {
    test('Create user successfully', async () => {
      const messageData: any = { displayName: "USERNAME",
        userId: "USERID",
        avatarUrl: "AVATARURL",
        lat: 100,
        lon: 100,
        geohash: "GEOHASH" 
    };
      const expectedResponse = 'Operation <POST /users> was handled successfully';
  
      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({
        data: expectedResponse,
      });
  
      const result = await RestPost(messageData);
  
      expect(result).toEqual(expectedResponse);
      
    });
  
    test('Create user failed', async () => {
      const messageData: any = { displayName: "USERNAME",
        userId: "USERID",
        avatarUrl: "AVATARURL",
        lat: 100,
        lon: 100,
        geohash: "GEOHASH" 
    };
  
      (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue(
        new Error('Simulated API error')
      );
      
      await expect(RestPost(messageData)).rejects.toThrow('Simulated API error');
    });
  });

// test("Create user", async () => {
//     const messageData = {
//         displayName: "USERNAME",
//         userId: "USERID",
//         avatarUrl: "AVATARURL",
//         lat: 100,
//         lon: 100,
//         geohash: "GEOHASH"
//     }

    

    

    // const response = await fetch('localhost:3001/users', {
    //     method: "POST",
    //     headers: {
    //     "Content-Type": "application/json",
    //     },
    //     referrerPolicy: "same-origin",
    //     body: JSON.stringify(messageData),
    // });
    
    


// describe("Rest Tests", () => {
//     test("Create user", async () => {
//         const messageData = {
//             displayName: "USERNAME",
//             userId: "USERID",
//             avatarUrl: "AVATARURL",
//             lat: 100,
//             lon: 100,
//             geohash: "GEOHASH"
//         }
//         const response = await fetch('localhost:3001/users', {
//             method: "POST",
//             headers: {
//             "Content-Type": "application/json",
//             },
//             referrerPolicy: "same-origin",
//             body: JSON.stringify(messageData),
//         });
//         const responseJson = await response.json()
//         console.log(responseJson)

        // expect(response.json()).toBe("Operation <POST /user> was handled successfully.")
    // })

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
