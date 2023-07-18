import { Link } from "react-router-dom";
import style from "./UserMenuModale.module.scss";

export default function UserMenuModale() {
  return (
    <div className={style.userMenuButtonModale}>
      <Link to={"/connexion"}>Connexion</Link>
      <Link to={"/connexion"}>Inscription</Link>
      <Link to={"/decisions/create"}>Publier une décision</Link>
    </div>
  );
}
