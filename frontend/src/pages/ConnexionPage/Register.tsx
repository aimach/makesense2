import { connexionPropType } from "./Login";
import style from "./ConnexionPage.module.scss";
import { HelpCircle } from "react-feather";
import regex from "../../utils/regex";

export default function Register({ setConnexionType }: connexionPropType) {
  // VALIDATE DATA WITH REGEX
  const verifyData = (e, dataType) => {
    if (e.target.value.match(dataType) || e.target.value == "") {
      setRequest({ ...request, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: false });
    } else {
      setErrors({ ...errors, [e.target.name]: true });
    }
  };
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
        <input
          type="email"
          className={style.inputStyle}
          onChange={(e) => verifyData(e, regex[name])}
        />
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
