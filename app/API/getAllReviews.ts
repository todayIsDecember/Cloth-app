import { API } from "../../helpers/api";

export const getAllReviews = async () => {
  const response = await fetch(API.reviews.getAll, {
    next: { revalidate: 100 },
  });
  const data = await response.json();
  return data;
};
