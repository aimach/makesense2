import style from "./CommentForm.module.scss";
import { useLocation } from "react-router-dom";
import { errorToast } from "../toasts/toats";
import { commentValidation } from "../../utils/validation";
import { postComment } from "../../utils/api/commentApi";

export default function CommentForm() {
  const location = useLocation();
  const decisionId: string = location.pathname.split("/").pop() as string;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("decisionId", decisionId);
    formData.append("userId", "1");
    const formJson: { [k: string]: FormDataEntryValue } = Object.fromEntries(
      formData.entries()
    );
    if (commentValidation(formJson).error) {
      errorToast("Une erreur est survenue");
    } else {
      postComment(formJson);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.commentForm}>
      <label htmlFor="content">Donne ton avis</label>
      <textarea id="content" name="content" minLength={10} required />
      <button type="submit">Poster</button>
    </form>
  );
}
