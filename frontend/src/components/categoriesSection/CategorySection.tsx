import { Grid } from "react-feather";
import style from "./CategorySection.module.scss";

export default function CategorySection() {
  return (
    <div className={style.homeSectionTitle}>
      <Grid />
      <h3>Par catégories</h3>
    </div>
  );
}
