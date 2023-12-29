import axios from "axios";
import { errorToast, successToast } from "../../components/toasts/toats";
import Cookies from "js-cookie";

const register = (body: {
  [k: string]: FormDataEntryValue;
}): Promise<{ status: string } | { status: string } | undefined> => {
  return axios
    .post(`${import.meta.env.VITE_BACKEND_URL as string}/register`, body)
    .then((res) => {
      if (res.status === 201) {
        return { status: "created" };
      }
    })
    .catch((err) => {
      console.error(err);
      errorToast("Une erreur est survenue");
      return { status: "error" };
    });
};

const login = (body: { [k: string]: FormDataEntryValue }): void => {
  axios
    .post(`${import.meta.env.VITE_BACKEND_URL as string}/login`, body)
    .then((res): void => {
      if (res.status === 200) {
        Cookies.set("token", res.data.accessToken);
      }
    })
    .catch((err) => {
      console.error(err);
      errorToast("Une erreur est survenue");
    });
};

export { login, register };
