import { API } from "../../helpers/api";

export const getColors = async (typeProduct: string) => {
  const response = await fetch(API.products.getColors, {
    method: "POST",
    body: JSON.stringify({ type: typeProduct }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
