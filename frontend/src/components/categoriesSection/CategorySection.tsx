import { Grid } from "react-feather";
import style from "./CategorySection.module.scss";
import CategoryCardContainer from "../categoryCard/CategoryCardContainer";

export default function CategorySection() {
  return (
    <div>
      <div className={style.categorySectionTitle}>
        <Grid />
        <h3>Par catégories</h3>
      </div>
      <CategoryCardContainer />
    </div>
  );
}
