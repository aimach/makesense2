import { Link } from "react-router-dom";
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
    <Link
      to={{
        pathname: "/decisions/search",
        search: `?category=${category.id}`,
      }}
    >
      <div className={style.categoryCard} style={backgroundStyle}>
        <p>{category.name}</p>
        <p>{`${category.decisions.length} décision${
          category.decisions.length > 1 ? "s" : ""
        }`}</p>
      </div>
    </Link>
  );
}
