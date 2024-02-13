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
  
async function RestConnection() {
    try {
        const response = await axios.put('localhost:3001/users?userId=USERID\&toggleConnection=true')
        return response.data;
    } catch (error) {
        throw error;
    } 
}

async function RestCoordinates() {
    try {
        const response = await axios.put('localhost:3001/users?userId=USERID\&lat=88\&lon=88')
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function RestDeleteUser() {
    try {
        const response = await axios.delete('localhost:3001/users?userId=USERID')
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

    test('toggleConnection successful', async () => {
        const expectedResponse = 'Operation <PUT /user?userId&lat&lon> was handled successfully.';

        (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValue({
            data: expectedResponse,
        });
        const result = await RestConnection();
        expect(result).toEqual(expectedResponse)
    })

    test('toggleConnection failed', async () => {
        (axios.put as jest.MockedFunction<typeof axios.put>).mockRejectedValue(
            new Error('toggleConnection failed')
        );
        await expect(RestConnection()).rejects.toThrow('toggleConnection failed')
    });

    test('update coordinates', async () => {
        const expectedResponse = 'Operation <PUT /user?userId&lat&lon> was handled successfully.';
        (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValue({
            data: expectedResponse,
        });
        const result = await RestCoordinates();
        expect(result).toEqual(expectedResponse)
    })

    test('update coordinates failed', async () => {
        (axios.put as jest.MockedFunction<typeof axios.put>).mockRejectedValue(
            new Error('update coordinates failed')
        );
        await expect(RestCoordinates()).rejects.toThrow('update coordinates failed')
    })

    test('Delete user', async () => {
        const expectedResponse = 'Operation <DELETE /users?userId> was handled successfully.';
        (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValue({
            data: expectedResponse,
        })
        const result = await RestDeleteUser();
        expect(result).toEqual(expectedResponse)
    })

    test('Delete user failed', async () => {
        (axios.delete as jest.MockedFunction<typeof axios.delete>).mockRejectedValue(
            new Error('Delete user failed')
        );
        await expect(RestDeleteUser()).rejects.toThrow('Delete user failed')
    })
  });

