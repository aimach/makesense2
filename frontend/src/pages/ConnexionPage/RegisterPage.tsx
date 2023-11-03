import { Link } from "react-router-dom";
// STYLE IMPORTS
import style from "../ConnexionPage/ConnexionPage.module.scss";
import { HelpCircle } from "react-feather";
import logo from "../../assets/img/logo.svg";
// PACKAGE IMPORTS
import Joi from "joi";

export default function RegisterPage() {
  // VALIDATE DATA WITH JOI
  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    // password rules : at least one uppercase letter, one lowercase letter, one digit, one special character and min 8 characters
    password: Joi.string().pattern(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    ),
    confirmedPassword: Joi.ref("password"),
    cgu: Joi.string().pattern(/^(on)$/),
  });

  // FORM SUBMIT HANDLER
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    event.preventDefault();
    // Read the form data
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const checkFormDatas = schema.validate(formJson);
    const checkCheckBox = "cgu" in formJson;
    if (checkFormDatas.error) {
      // console.log(checkFormDatas.error.details[0].path[0]);
      console.log(checkFormDatas);
    } else {
      console.log("Form posted");
    }
  }
  return (
    <div className={style.connexionStyle}>
      <img src={logo} alt="logo" />
      <h2>Créer un compte</h2>
      <p>
        Vous avez déjà un compte ?{" "}
        <Link to="/login">
          <span className={style.inlineLink}>Me connecter</span>
        </Link>
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Adresse email * <HelpCircle className={style.helpIcon} />
        </label>
        <input type="email" name="email" className={style.inputStyle} />
        <label>
          Mot de passe * <HelpCircle className={style.helpIcon} />
        </label>
        <input type="password" name="password" className={style.inputStyle} />
        <p className={style.infoPassword}>
          Pour être un mot de passe fort, doit contenir des minuscules, des
          majuscules, des chiffres et des caractères spéciaux (#?!@$%^&*-). Il
          doit aussi être long de 8 caractères minimum.
        </p>
        <label>
          Vérification du mot de passe *
          <HelpCircle className={style.helpIcon} />
        </label>
        <input
          type="password"
          name="confirmedPassword"
          className={style.inputStyle}
        />
        <label>
          Conditions générales d'utilisation *
          <HelpCircle className={style.helpIcon} />
        </label>
        <div className={style.checkboxContainer}>
          <input type="checkbox" name="cgu" />
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
