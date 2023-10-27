import style from "./Help.module.scss";
interface Props {
  content: string;
}
export default function HelpModal({ content }: Props) {
  return <div className={style.helpModal}>{content}</div>;
}
