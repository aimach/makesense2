import { Link } from "react-router-dom";
import style from "./UserMenuModale.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function UserMenuModale() {
  const { profile } = useContext(UserContext);
  return (
    <div className={style.userMenuButtonModale}>
      {profile ? (
        <p>Mes informations</p>
      ) : (
        <>
          <Link to={"/login"}>Connexion</Link>
          <Link to={"/register"}>Inscription</Link>
        </>
      )}
      <Link to={"/decisions/create"}>Publier une décision</Link>
    </div>
  );
}
