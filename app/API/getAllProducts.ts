import { API } from "../../helpers/api";

export const getAllProducts = async () => {
  const response = await fetch(API.products.all, {
    next: { revalidate: 1 },
  });
  const data = await response.json();
  return data;
};
