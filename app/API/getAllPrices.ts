import { API } from "../../helpers/api";

export const getAllPrices = async () => {
  const response = await fetch(API.prices.getAll, {
    next: { revalidate: 1 },
  });
  const data = await response.json();
  return data;
};
