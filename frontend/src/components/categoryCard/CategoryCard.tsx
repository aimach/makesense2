import { CategoryType } from "../../utils/types";
import style from "./CategoryCard.module.scss";
interface Props {
  category: CategoryType;
}

export default function CategoryCard({ category }: Props) {
  return <div className={style.categoryCard}>{category.name}</div>;
}
