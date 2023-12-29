import axios from "axios";
import { UserType } from "../types";
import Cookies from "js-cookie";

const getUsersByName = (searchValue: string): Promise<void | UserType[]> => {
  return axios
    .get(
      `${import.meta.env.VITE_BACKEND_URL as string}/users?name=${searchValue}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token") as string}`,
        },
      }
    )
    .then((res) => res.data as UserType[])
    .catch((err) => {
      console.error(err);
    });
};

export { getUsersByName };
