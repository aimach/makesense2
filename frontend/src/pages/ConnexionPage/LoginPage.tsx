// STYLE IMPORTS
import style from "../ConnexionPage/ConnexionPage.module.scss";
import { HelpCircle } from "react-feather";
import logo from "../../assets/img/logo.svg";
// PACKAGE IMPORTS
import Joi from "joi";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
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
    // const checkCheckBox = "cgu" in formJson;
    if (checkFormDatas.error) {
      // console.log(checkFormDatas.error.details[0].path[0]);
      console.log(checkFormDatas);
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL as string}/login`, {
          email: formJson.email,
          password: formJson.password,
        })
        .then((response) => console.log(response.data))
        .catch((err) => console.error(err));
    }
  }
  return (
    <div className={style.connexionStyle}>
      <img src={logo} alt="logo" />
      <h2>Se connecter</h2>
      <p>
        Vous n'avez pas de compte ?{" "}
        <Link to="/register">
          <span className={style.inlineLink}>Créer un compte</span>
        </Link>
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Adresse email * <HelpCircle className={style.helpIcon} />
        </label>
        <input
          type="email"
          name="email"
          className={style.inputStyle}
          required
        />
        <label>
          Mot de passe * <HelpCircle className={style.helpIcon} />
        </label>
        <input
          type="password"
          name="password"
          className={style.inputStyle}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-]).{8,}$"
          required
        />
        <p className={style.textSizeS}>Oublié ?</p>
        <button type="submit" className={style.buttonStyle}>
          Me connecter
        </button>
      </form>
    </div>
  );
}
