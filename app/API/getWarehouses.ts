import { API } from "../../helpers/api";

export const getWarehouses = async (keywords, cityName) => {
  const response = await fetch(API.delivery.getWarehouses, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "CityName": cityName,
	"keywords": keywords
    }),
  });
  const data = await response.json();
  return data;
};
