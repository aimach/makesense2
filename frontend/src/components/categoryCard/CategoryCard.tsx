import { CategoryType } from "../../utils/types";
import style from "./CategoryCard.module.scss";
interface Props {
  category: CategoryType;
}

export default function CategoryCard({ category }: Props) {
  const backgroundStyle = {
    backgroundColor: category.color,
  };
  return (
    <div className={style.categoryCard} style={backgroundStyle}>
      {category.name}
    </div>
  );
}
