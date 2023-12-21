import { CommentType } from "../../../utils/types";
import style from "./Comment.module.scss";

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
          {comment.user.firstname} {comment.user.lastname}, le{" "}
          {comment.date.substring(0, 10)}
        </h4>
      </div>
      <div className={style.contentContainer}>{comment.content}</div>
    </div>
  );
}
