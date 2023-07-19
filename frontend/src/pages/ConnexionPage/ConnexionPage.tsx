import { useState } from "react";
import logo from "../../assets/img/logo.svg";
import style from "./ConnexionPage.module.scss";
import Login from "./Login";
import Register from "./Register";

export default function ConnexionPage() {
  const [connexionType, setConnexionType] = useState("login");

  return (
    <div>
      <img src={logo} alt="logo" />
      <h2 className={`${style.title}`}>
        {connexionType === "login" ? "Se connecter" : "Créer un compte"}
      </h2>
      {connexionType === "login" ? (
        <div>
          Vous n'avez pas de compte ?
          <button onClick={() => setConnexionType("register")}>
            Créer un compte
          </button>
        </div>
      ) : (
        <div>
          Vous avez déjà un compte ?
          <button onClick={() => setConnexionType("login")}>
            Se connecter
          </button>
        </div>
      )}
      {connexionType === "login" ? <Login /> : <Register />}
    </div>
  );
}
