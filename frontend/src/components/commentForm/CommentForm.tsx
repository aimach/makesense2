import style from "./CommentForm.module.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function CommentForm() {
  const location = useLocation();
  const decisionId: string = location.pathname.split("/").pop() as string;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("decisionId", decisionId);
    formData.append("userId", "1");
    const formJson = Object.fromEntries(formData.entries());
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL as string}/comments`, formJson)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  return (
    <form onSubmit={handleSubmit} className={style.commentForm}>
      <label htmlFor="content">Donne ton avis</label>
      <textarea id="content" name="content" />
      <button type="submit">Poster</button>
    </form>
  );
}
