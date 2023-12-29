import { Link, useNavigate } from "react-router-dom";
// STYLE IMPORTS
import style from "../ConnexionPage/ConnexionPage.module.scss";
import { HelpCircle } from "react-feather";
import logo from "../../assets/img/logo.svg";
// PACKAGE IMPORTS
import { errorToast } from "../../components/toasts/toats";
import { registerValidation } from "../../utils/validation";
import { register } from "../../utils/api/authApi";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getServices } from "../../utils/api/serviceApi";
import { ServiceType } from "../../utils/types";
import { useState } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [services, setServices] = useState<void | ServiceType[]>([]);

  useEffect(() => {
    getServices()
      .then((res) => {
        setServices(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // FORM SUBMIT HANDLER
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    event.preventDefault();
    // Read the form data
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    if (registerValidation(formJson).error) {
      errorToast("Les mots de passe ne sont pas identiques");
    } else {
      register(formJson)
        .then((res) => {
          if (res?.status === "created") {
            navigate("/");
          }
        })
        .catch((err) => {
          console.error(err);
          errorToast("Une erreur est survenue");
        });
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
        <label>Prénom *</label>
        <input
          type="text"
          name="firstname"
          className={style.inputStyle}
          required
        />
        <label>Nom de famille *</label>
        <input
          type="text"
          name="lastname"
          className={style.inputStyle}
          required
        />
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
          Poste occupé * <HelpCircle className={style.helpIcon} />
        </label>
        <input
          type="text"
          name="position"
          className={style.inputStyle}
          required
        />
        <label>
          Service * <HelpCircle className={style.helpIcon} />
        </label>
        <select name="serviceId" className={style.inputStyle}>
          <option key={0} value="null">
            Choisir son service
          </option>
          {services?.map((service) => {
            return (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            );
          })}
        </select>
        <label>
          Mot de passe * <HelpCircle className={style.helpIcon} />
        </label>
        <input
          type="password"
          name="password"
          className={style.inputStyle}
          minLength={8}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-]).{8,}$"
          required
        />
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
          minLength={8}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-]).{8,}$"
          required
        />
        <label>
          Conditions générales d'utilisation *
          <HelpCircle className={style.helpIcon} />
        </label>
        <div className={style.checkboxContainer}>
          <input type="checkbox" name="cgu" required />
          <p>
            En cochant la présente case, je reconnais avoir pris connaissance et
            accepte les conditions générales d’utilisation
          </p>
        </div>
        <button type="submit" className={style.buttonStyle}>
          M'inscrire avec cet e-mail
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
