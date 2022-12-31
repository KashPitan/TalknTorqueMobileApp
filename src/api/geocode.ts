import { apiKey } from '../../firebase';
export const geocode = async (address: string) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
    );

    const data = await res.json();
    return data.results[0].geometry.location;
  } catch (error) {
    console.log(error);
  }
};
