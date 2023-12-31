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
          <Link to="/profil">Mes informations</Link>
          <button type="button" onClick={handleClick}>
            Deconnexion
          </button>
        </>
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
