import axios from "axios";
import { errorToast, successToast } from "../../components/toasts/toats";

const postComment = (body: { [k: string]: FormDataEntryValue }): void => {
  axios
    .post(`${import.meta.env.VITE_BACKEND_URL as string}/comments`, body)
    .then((res) => {
      if (res.status === 201) {
        successToast("Commentaire soumis avec succès");
      }
    })
    .catch((err) => {
      console.error(err);
      errorToast("Une erreur est survenue");
    });
};

export { postComment };
