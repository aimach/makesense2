import axios from "axios";
import { CategoryType } from "../types";

const getCategories = (): Promise<void | CategoryType[]> => {
  return axios
    .get(`${import.meta.env.VITE_BACKEND_URL as string}/categories`, {
      withCredentials: true,
    })
    .then((res) => res.data as CategoryType[])
    .catch((err) => {
      console.error(err);
    });
};

export { getCategories };
