import logo from "../../assets/img/logo.svg";
import style from "./ConnexionPage.module.scss";
import { HelpCircle } from "react-feather";

interface loginPropsType {
  setConnexionType: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login({ setConnexionType }: loginPropsType) {
  function handleSubmit(e: Event) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // // Read the form data
    // const form = e.target;
    // const formData = new FormData(form);

    // // You can pass formData as a fetch body directly:
    // fetch("/some-api", { method: form.method, body: formData });

    // // Or you can work with it as a plain object:
    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    console.log("submitted");
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
