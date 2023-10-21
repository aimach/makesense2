// REACT IMPORTS
import { SyntheticEvent, useState } from "react";
// COMPONENTS IMPORTS
import { connexionPropType } from "./Login";
// STYLE IMPORTS
import style from "./ConnexionPage.module.scss";
import { HelpCircle } from "react-feather";
// OTHER IMPORTS
import regex from "../../utils/regex";

export default function Register({ setConnexionType }: connexionPropType) {
  // VALIDATE DATA WITH REGEX
  const verifyData = (e, regex) => {
    if (e.target.value.match(regex)) {
      setRequest({ ...request, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: false });
    } else {
      setErrors({ ...errors, [e.target.name]: true });
    }
  };

  // ERRORS HANDLER
  const [errors, setErrors] = useState({
    email: { status: false, message: "Veillez taper un email valide" },
  });

  // FORM SUBMIT HANDLER
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    event.preventDefault();

    // Read the form data
    const form = event.currentTarget;
    const formData = new FormData(form);
    console.log(formData);

    // // You can pass formData as a fetch body directly:
    // fetch("/some-api", { method: form.method, body: formData });

    // // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    console.log("submitted");
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
