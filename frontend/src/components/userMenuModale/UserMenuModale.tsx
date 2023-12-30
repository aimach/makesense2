import { Link } from "react-router-dom";
import style from "./UserMenuModale.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function UserMenuModale() {
  const { profile, logout } = useContext(UserContext);

  const handleClick = () => {
    logout();
  };

  return (
    <div className={style.userMenuButtonModale}>
      {profile ? (
        <>
          <p>Mes informations</p>
          <button type="button" onClick={handleClick}>
            Deconnexion
          </button>
          <Link to={"/decisions/create"}>Publier une décision</Link>
        </>
      ) : (
        <>
          <Link to={"/login"}>Connexion</Link>
          <Link to={"/register"}>Inscription</Link>
        </>
      )}
    </div>
  );
}
