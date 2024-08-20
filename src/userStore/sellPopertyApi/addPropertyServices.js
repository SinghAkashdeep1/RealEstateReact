import axios from "axios";


export const typesListApi = async (data) => {
  try {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzZlODQwNTZmODQyN2JlZDdiMDA1YzU4YjFkMjY3NGY3ODUyZDhiZmY1ZTRjYjAwMzM0ODhmZWNiZGZlNTdlOWM3ZDUyNTI1NmEzZGM1YjEiLCJpYXQiOjE3MjMxOTI5MTUuOTI1NDAxLCJuYmYiOjE3MjMxOTI5MTUuOTI1NDAzLCJleHAiOjE3NTQ3Mjg5MTUuODMzMTc2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ICC8KOzDWkjX9K6MkaGMZITjDKy4i0U-hlXJjoBC7WrHNUKDwvdBzyYkwtJ8--QV6Kaf4di5iYPDxtdBFTxEUMeMOW7fcZDelwrT7P9sWHmTtM0nM6BMFU3fNFEPv8o6XaVUqYWCjqZ_4yB41O1ekJzLj_6N50Wyn-Oo49XZdNO2OgqkgsHRuuirdesSZIOvfa2bGvay2xkw4iJuT4YInlJ65bS_p-q7gXg1Sg0WPiC6_J_ghrSJJedtdbZ7Y0-fCXekzP6oQRnOeo62Oc3QvQ--f2ADE2LeeLTPoeRTjuNZvwfz0EqTsguZq_w32gMzN95Bc8JBmUoSniU-LgKA3P0_C6LgrE3IROI01aYQUZA6kI0HEtgD26mXsEq-bIwoPZNQ1f4d1rf0n3ADfK870iZNe84gWI15f-t5ZISKw47lKY9DOr6DGi7udpO4R_ODH7V7i3Mlz37KLH5yDpP_oxy2LCaBifT_V0iIfypzKPXUGz5IqfEIGYn4ejsg_xOOdArsZlQRiUcwGGCW_PIXqvq2q5EADgkGWJ2dhiqXc0-ZxKRF2Rkfpjst2NR_0UjEG54jwVcyJA-55HhDYdrtQYQzKn5XgGTnOepDlM9EsUhmu-NCsGbYToSwZwMELic6nnFR5zYSgLDHpaHsqL7X0zwjJJdVU3DrANqDovOZttg';
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`http://127.0.0.1:8000/api/add/property`,  headers);
    return response;
  } catch (error) {
    console.error("Error in userListApi:", error);
    throw error;
  }
};


export const propertyAddApi = async (data) => {
    try {
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzZlODQwNTZmODQyN2JlZDdiMDA1YzU4YjFkMjY3NGY3ODUyZDhiZmY1ZTRjYjAwMzM0ODhmZWNiZGZlNTdlOWM3ZDUyNTI1NmEzZGM1YjEiLCJpYXQiOjE3MjMxOTI5MTUuOTI1NDAxLCJuYmYiOjE3MjMxOTI5MTUuOTI1NDAzLCJleHAiOjE3NTQ3Mjg5MTUuODMzMTc2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ICC8KOzDWkjX9K6MkaGMZITjDKy4i0U-hlXJjoBC7WrHNUKDwvdBzyYkwtJ8--QV6Kaf4di5iYPDxtdBFTxEUMeMOW7fcZDelwrT7P9sWHmTtM0nM6BMFU3fNFEPv8o6XaVUqYWCjqZ_4yB41O1ekJzLj_6N50Wyn-Oo49XZdNO2OgqkgsHRuuirdesSZIOvfa2bGvay2xkw4iJuT4YInlJ65bS_p-q7gXg1Sg0WPiC6_J_ghrSJJedtdbZ7Y0-fCXekzP6oQRnOeo62Oc3QvQ--f2ADE2LeeLTPoeRTjuNZvwfz0EqTsguZq_w32gMzN95Bc8JBmUoSniU-LgKA3P0_C6LgrE3IROI01aYQUZA6kI0HEtgD26mXsEq-bIwoPZNQ1f4d1rf0n3ADfK870iZNe84gWI15f-t5ZISKw47lKY9DOr6DGi7udpO4R_ODH7V7i3Mlz37KLH5yDpP_oxy2LCaBifT_V0iIfypzKPXUGz5IqfEIGYn4ejsg_xOOdArsZlQRiUcwGGCW_PIXqvq2q5EADgkGWJ2dhiqXc0-ZxKRF2Rkfpjst2NR_0UjEG54jwVcyJA-55HhDYdrtQYQzKn5XgGTnOepDlM9EsUhmu-NCsGbYToSwZwMELic6nnFR5zYSgLDHpaHsqL7X0zwjJJdVU3DrANqDovOZttg';
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`http://127.0.0.1:8000/api/add/property`, data, headers);
      return response;
    } catch (error) {
      console.error("Error in propertyAddApi:", error);
      throw error;
    }
  };
  