import { useState } from "react";
// STYLE IMPORTS
import style from "./ConnexionPage.module.scss";
import logo from "../../assets/img/logo.svg";
import { HelpCircle } from "react-feather";
// PACKAGE IMPORTS
import Joi from "joi";

export default function Login() {
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
