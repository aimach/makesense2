import { CommentType } from "../../../utils/types";
import style from "./Comment.module.scss";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Props {
  comment: CommentType;
}

export default function Comment({ comment }: Props) {
  return (
    <div className={style.commentDetailsContainer}>
      <div className={style.userContainer}>
        <img
          src={comment.user.avatar as string}
          className="rounded"
          alt={`${comment.user.firstname} ${comment.user.lastname}`}
        />
        <h4>
          {comment.user.firstname} {comment.user.lastname},{" "}
          {format(new Date(comment.date), "'le' dd MMMMMM yyyy", {
            locale: fr,
          })}
        </h4>
      </div>
      <div className={style.contentContainer}>{comment.content}</div>
    </div>
  );
}
