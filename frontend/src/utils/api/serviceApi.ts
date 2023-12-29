import axios from "axios";
import { ServiceType } from "../types";

const getServices = (): Promise<void | ServiceType[]> => {
  return axios
    .get(`${import.meta.env.VITE_BACKEND_URL as string}/services`, {
      withCredentials: true,
    })
    .then((res) => res.data as ServiceType[])
    .catch((err) => {
      console.error(err);
    });
};

export { getServices };
