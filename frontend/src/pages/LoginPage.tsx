import logo from "../assets/img/logo.svg";
import style from "./LoginPage.module.scss";
import { HelpCircle } from "react-feather";

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
          Adresse email * <HelpCircle className={style.helpIcon} />
          <input type="email" className={style.inputStyle} />
        </label>
        <label>
          Mot de passe * <HelpCircle className={style.helpIcon} />
          <input type="password" className={style.inputStyle} />
          <p className={style.textSizeS}>Oublié ?</p>
        </label>
        <button type="submit" className={style.buttonStyle}>
          Me connecter
        </button>
      </form>
    </div>
  );
}
