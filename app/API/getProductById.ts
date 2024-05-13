import { API } from "../../helpers/api";

export const getProductById = async (id) => {
  const response = await fetch(`${API.products.getById}/${id}`, {
    next: { revalidate: 1 },
  });
  const data = await response.json();
  return data;
};
