import style from "./Tag.module.scss";

interface TagProps {
  content: string;
  color: string;
}

export default function Tag({ content, color }: TagProps) {
  const backgroundColor = `${color.slice(0, -1)}, .1)`;
  const tagStyle = {
    backgroundColor: backgroundColor,
    border: `1px solid ${color}`,
    color: color,
  };

  return (
    <div style={tagStyle} className={style.tag}>
      {content}
    </div>
  );
}
