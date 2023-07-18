import { Grid, Clock } from "react-feather";

export default function CategorySection() {
  return (
    <section>
      <h2>Trouver une décision à impact positif</h2>
      <div>
        <Grid />
        <h3>Par catégories</h3>
      </div>
      <div>
        <Clock />
        <h3>Les dernières déposées</h3>
      </div>
    </section>
  );
}
