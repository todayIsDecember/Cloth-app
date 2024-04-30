import { API } from "../../helpers/api";

export const getAddresses = async (keywords) => {
  const response = await fetch(API.delivery.getAddresses, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keywords: keywords
    }),
  });
  const data = await response.json();
  return data;
};
