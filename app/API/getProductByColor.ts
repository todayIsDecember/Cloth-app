import { API } from "../../helpers/api";

export const getProductByColor = async (color, type) => {
  const response = await fetch(API.products.getByColor, {
    method: "POST",
    body: JSON.stringify({ color: color, type: type }),
    headers: {
      "Content-Type": "application/json",
    }
  });
  const data = await response.json();
  return data;
};
