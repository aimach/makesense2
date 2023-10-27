// REACT IMPORTS
import { useState } from "react";
// COMPONENTS IMPORTS
import { connexionPropType } from "./Login";
// STYLE IMPORTS
import style from "./ConnexionPage.module.scss";
import { HelpCircle } from "react-feather";
// PACKAGE IMPORTS
import Joi from "joi";

// VALIDATE DATA WITH JOI

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
  confirmedPassword: Joi.ref("password"),
  cgu: Joi.string().pattern(/^(on)$/),
});

export default function Register({ setConnexionType }: connexionPropType) {
  // ERRORS HANDLER
  const [errors, setErrors] = useState({
    email: { status: false, message: "Veillez taper un email valide" },
    password: { status: false, message: "Veillez taper un email valide" },
    confirmedPassword: {
      status: false,
      message: "Veillez taper un email valide",
    },
    cgu: { status: false, message: "Veillez taper un email valide" },
  });

  // FORM SUBMIT HANDLER
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    event.preventDefault();
    // Read the form data
    const form = event.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    const checkFormDatas = schema.validate(formJson);
    if (checkFormDatas.error) {
      // console.log(checkFormDatas.error.details[0].path[0]);
      console.log(checkFormDatas);
    }
  }
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
      <form onSubmit={handleSubmit}>
        <label>
          Adresse email * <HelpCircle className={style.helpIcon} />
        </label>
        <input type="email" name="email" className={style.inputStyle} />
        <label>
          Mot de passe * <HelpCircle className={style.helpIcon} />
        </label>
        <input type="password" name="password" className={style.inputStyle} />
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
