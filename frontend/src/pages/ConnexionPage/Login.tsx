// STYLE IMPORTS
import style from "./ConnexionPage.module.scss";
import { HelpCircle } from "react-feather";
// PACKAGE IMPORTS
import Joi from "joi";

export interface connexionPropType {
  setConnexionType: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login({ setConnexionType }: connexionPropType) {
  const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    // password rules : at least one uppercase letter, one lowercase letter, one digit, one special character and min 8 characters
    password: Joi.string().pattern(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    ),
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
    <div>
      <p>
        Vous n'avez pas de compte ?{" "}
        <span
          className={style.inlineLink}
          onClick={() => setConnexionType("register")}
        >
          Créer un compte
        </span>
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
        <p className={`${style.textSizeS} ${style.inlineLink}`}>Oublié ?</p>
        <button type="submit" className={style.buttonStyle}>
          Me connecter
        </button>
      </form>
    </div>
  );
}
