import { API } from "../../helpers/api";

export const getProductsByCategory = async (category) => {
  const response = await fetch(API.products.getByCategory, {
    method: "POST",
    body: JSON.stringify({ category: category }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
