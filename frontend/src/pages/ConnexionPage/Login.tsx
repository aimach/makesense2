import style from "./ConnexionPage.module.scss";
import { HelpCircle } from "react-feather";

export interface connexionPropType {
  setConnexionType: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login({ setConnexionType }: connexionPropType) {
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
        </label>
        <input type="email" className={style.inputStyle} />
        <label>
          Mot de passe * <HelpCircle className={style.helpIcon} />
        </label>
        <input type="password" className={style.inputStyle} />
        <p className={`${style.textSizeS} ${style.inlineLink}`}>Oublié ?</p>
        <button type="submit" className={style.buttonStyle}>
          Me connecter
        </button>
      </form>
    </div>
  );
}
