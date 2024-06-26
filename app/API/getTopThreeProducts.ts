import { API } from "../../helpers/api";

export const getTopThreeProducts = async () => {
  const response = await fetch(API.products.getThree, {
    next: { revalidate: 1 },
  });
  const data = await response.json();
  return data;
};
