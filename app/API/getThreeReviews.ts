import { API } from "../../helpers/api";

export const getThreeReviews = async () => {
  const response = await fetch(API.reviews.getThree, {
  });
  const data = await response.json();
  return data;
};
