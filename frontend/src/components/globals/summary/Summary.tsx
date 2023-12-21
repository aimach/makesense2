import { CommentType } from "../../../utils/types";
import style from "./Summary.module.scss";

interface Props {
  summary: string;
  details: string | CommentType[];
}

export default function Summary({ summary, details }: Props) {
  return (
    <details className={style.detailsContainer}>
      <summary>{summary}</summary>
      <p>{summary !== "Avis 💬" ? (details as string) : null}</p>
    </details>
  );
}
