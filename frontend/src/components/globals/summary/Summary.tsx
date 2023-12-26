import { CommentType } from "../../../utils/types";
import style from "./Summary.module.scss";
import Comment from "../comment/Comment";

interface Props {
  summary: string;
  details: string | CommentType[];
}

export default function Summary({ summary, details }: Props) {
  return (
    <details className={style.detailsContainer}>
      <summary>
        {summary}{" "}
        {summary === "Avis 💬" && details != null
          ? `( ${details.length} )`
          : null}
      </summary>
      {summary !== "Avis 💬" ? (
        <p>{details as string}</p>
      ) : (
        <div className={style.commentContainer}>
          {details != null && details.length > 0 ? (
            (details as CommentType[]).map((comment: CommentType) => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <p>Il n'y a pas de commentaire pour l'instant</p>
          )}
        </div>
      )}
    </details>
  );
}
