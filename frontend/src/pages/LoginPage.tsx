import logo from "../assets/img/logo.svg";
import style from "./LoginPage.module.scss";

export default function LoginPage() {
  return (
    <div>
      <img src={logo} alt="logo" />
      <h2 className={`${style.title}`}>Se connecter</h2>
      <p>
        Vous n'avez pas de compte ?{" "}
        <span className={style.inlineLink}>Créer un compte</span>
      </p>
      <form>
        <label>
          Adresse email *
          <input type="email" className={style.inputStyle} />
        </label>
        <label>
          Mot de passe *
          <input type="password" className={style.inputStyle} />
        </label>
        <button type="submit" className={style.buttonStyle}>
          Me connecter
        </button>
      </form>
    </div>
  );
}
