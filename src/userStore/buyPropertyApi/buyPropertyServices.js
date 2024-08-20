import axios from "axios";


export const propertiesListApi = async (data) => {
  try {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjA2NzdlNzFjYzg5ZmM0OWM4MWQ2NDc2YzlkNzJiZDQ2NTBlOTNiYjFmYWQzOGMxOTgxMWY0ZWJkYzdiMjgyYTMzOTVhNGY4OTc1NDI0NjAiLCJpYXQiOjE3MjM0NTUzNzIuODc4MTY2LCJuYmYiOjE3MjM0NTUzNzIuODc4MTY4LCJleHAiOjE3NTQ5OTEzNzIuNjg3OTE5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VB9McIArPiHMmoPCOY-fA_jhitkiB1z4r2UrMoDFUqshNBy4BX3sp7XZfsbg9GX9JiopGA3_9b-NDiixIHNhXcmyCYNxthXiDyh-59FSzVAtYxtvFiBNdx0nAgKIuYY2ASVYEFH-r91GCXYscd5lLxcg5MpIrG8D3YZod0l0EdHAyA2LdN9pNGElEq38ZqAv-J9FD6T0lJdt4H3ooQpz6hmyD0s83aqA7PA1oR_8pl6MYw1g4b0VBd9YhIX7g-Q2rMhD5Ua4Oty-T0ETCtveyi9Vn9AclOBGFhT6r3xj9PSRS3uQztGzd7sQ0p5a-fuXbNjJyGc4RFlSM5HC46hHKePmcPWB_fxqUSD_JK_29dNumKZWSEkGzax0ranr8PRBgDvplE2gvy6i6B6clnA8ASPY9d9TtlE8W54wa2xOZrQmqxvphfxh4XiIHDycYpWFOjHTWrtglEGlIUWNVBCudjAD-MSqW1iVZyoiqOP8CnAXEh2FOqsXjww8XJAqhBH2wwVXVXYckwf4m5s8cL40qh75vUED2jSlgrt9ZpkVP7DhgeUZg7gz-BVrtH85tc-7tFRlQq0aE-nOBKTHBKqmRZ6PHCMUXsNtm7y9Sop11jRhWdskWYi8zVh31_qRwforG9JiC5u_mmN7PSFm6uRTfpQpy22aEzZLyQrAzm1FPNw';
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`http://127.0.0.1:8000/api/list/properties`,  headers);
    return response;
  } catch (error) {
    console.error("Error in propertiesListApi:", error);
    throw error;
  }
};

export const propertyDetailApi = async (data) => {
  try {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjA2NzdlNzFjYzg5ZmM0OWM4MWQ2NDc2YzlkNzJiZDQ2NTBlOTNiYjFmYWQzOGMxOTgxMWY0ZWJkYzdiMjgyYTMzOTVhNGY4OTc1NDI0NjAiLCJpYXQiOjE3MjM0NTUzNzIuODc4MTY2LCJuYmYiOjE3MjM0NTUzNzIuODc4MTY4LCJleHAiOjE3NTQ5OTEzNzIuNjg3OTE5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VB9McIArPiHMmoPCOY-fA_jhitkiB1z4r2UrMoDFUqshNBy4BX3sp7XZfsbg9GX9JiopGA3_9b-NDiixIHNhXcmyCYNxthXiDyh-59FSzVAtYxtvFiBNdx0nAgKIuYY2ASVYEFH-r91GCXYscd5lLxcg5MpIrG8D3YZod0l0EdHAyA2LdN9pNGElEq38ZqAv-J9FD6T0lJdt4H3ooQpz6hmyD0s83aqA7PA1oR_8pl6MYw1g4b0VBd9YhIX7g-Q2rMhD5Ua4Oty-T0ETCtveyi9Vn9AclOBGFhT6r3xj9PSRS3uQztGzd7sQ0p5a-fuXbNjJyGc4RFlSM5HC46hHKePmcPWB_fxqUSD_JK_29dNumKZWSEkGzax0ranr8PRBgDvplE2gvy6i6B6clnA8ASPY9d9TtlE8W54wa2xOZrQmqxvphfxh4XiIHDycYpWFOjHTWrtglEGlIUWNVBCudjAD-MSqW1iVZyoiqOP8CnAXEh2FOqsXjww8XJAqhBH2wwVXVXYckwf4m5s8cL40qh75vUED2jSlgrt9ZpkVP7DhgeUZg7gz-BVrtH85tc-7tFRlQq0aE-nOBKTHBKqmRZ6PHCMUXsNtm7y9Sop11jRhWdskWYi8zVh31_qRwforG9JiC5u_mmN7PSFm6uRTfpQpy22aEzZLyQrAzm1FPNw';
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`http://127.0.0.1:8000/api/property/detail/${data}`,  headers);
    return response;
  } catch (error) {
    console.error("Error in propertiesListApi:", error);
    throw error;
  }
};
