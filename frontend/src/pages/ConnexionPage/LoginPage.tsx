// STYLE IMPORTS
import style from "../ConnexionPage/ConnexionPage.module.scss";
import { HelpCircle } from "react-feather";
import logo from "../../assets/img/logo.svg";
// PACKAGE IMPORTS
import { Link } from "react-router-dom";
import { loginValidation } from "../../utils/validation";
import { errorToast } from "../../components/toasts/toats";
import { login } from "../../utils/api/authApi";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  // FORM SUBMIT HANDLER
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    event.preventDefault();
    // Read the form data
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    if (loginValidation(formJson).error) {
      errorToast("Une erreur est survenue");
    } else {
      login({
        email: formJson.email,
        password: formJson.password,
      });
      if (Cookies.get("token")) {
        navigate("/");
      }
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
      <ToastContainer />
    </div>
  );
}
