import { Link } from "react-router-dom";
import style from "./UserMenuModale.module.scss";

export default function UserMenuModale() {
  return (
    <div className={style.userMenuButtonModale}>
      <Link to={"/login"}>Connexion</Link>
      <Link to={"/register"}>Inscription</Link>
      <Link to={"/decisions/create"}>Publier une décision</Link>
    </div>
  );
}
