import logo from "../assets/img/logo.svg";
import style from "./LoginPage.module.scss";

export default function LoginPage() {
  return (
    <div>
      <img src={logo} alt="logo" />
      <h2 className={`${style.title}`}>Se connecter</h2>
      <p>Vous n'avez pas de compte ? Créer un compte</p>
      <form>
        <label>
          Adresse email *
          <input type="email" />
        </label>
        <label>
          Mot de passe *
          <input type="password" />
        </label>
      </form>
    </div>
  );
}
