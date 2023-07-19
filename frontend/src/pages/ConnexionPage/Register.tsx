import { connexionPropType } from "./Login";
import style from "./ConnexionPage.module.scss";
import { HelpCircle } from "react-feather";

export default function Register({ setConnexionType }: connexionPropType) {
  return (
    <div>
      <p>
        Vous avez déjà un compte ?{" "}
        <span
          className={style.inlineLink}
          onClick={() => setConnexionType("login")}
        >
          Me connecter
        </span>
      </p>
      <form>
        <label>
          Adresse email * <HelpCircle className={style.helpIcon} />
        </label>
        <input type="email" className={style.inputStyle} />
        <label>
          Mot de passe * <HelpCircle className={style.helpIcon} />
        </label>
        <input type="password" className={style.inputStyle} />
        <label>
          Vérification du mot de passe *
          <HelpCircle className={style.helpIcon} />
        </label>
        <input type="password" className={style.inputStyle} />
        <label>
          Conditions générales d'utilisation *
          <HelpCircle className={style.helpIcon} />
        </label>
        <div className={style.checkboxContainer}>
          <input type="checkbox" />
          <p>
            En cochant la présente case, je reconnais avoir pris connaissance et
            accepte les conditions générales d’utilisation
          </p>
        </div>
        <button type="submit" className={style.buttonStyle}>
          M'inscrire avec cet e-mail
        </button>
      </form>
    </div>
  );
}
