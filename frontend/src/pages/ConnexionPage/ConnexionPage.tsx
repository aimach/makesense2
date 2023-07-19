import { useState } from "react";
import logo from "../../assets/img/logo.svg";
import style from "./ConnexionPage.module.scss";
import Login from "./Login";
import Register from "./Register";

export default function ConnexionPage() {
  const [connexionType, setConnexionType] = useState("login");

  return (
    <div className={style.connexionStyle}>
      <img src={logo} alt="logo" />
      <h2 className={`${style.title}`}>
        {connexionType === "login" ? "Se connecter" : "Créer un compte"}
      </h2>
      {connexionType === "login" ? (
        <Login setConnexionType={setConnexionType} />
      ) : (
        <Register setConnexionType={setConnexionType} />
      )}
    </div>
  );
}
