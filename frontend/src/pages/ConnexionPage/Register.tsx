import { connexionPropType } from "./Login";
import style from "./ConnexionPage.module.scss";

export default function Register({ setConnexionType }: connexionPropType) {
  return (
    <div>
      <p>
        Vous avez déjà un compte ?{" "}
        <span
          className={style.inlineLink}
          onClick={() => setConnexionType("login")}
        >
          Se connecter
        </span>
      </p>
      <form>
        <label>
          Adresse email *
          <input type="email" />
        </label>
        <label>
          Mot de passe *
          <input type="password" />
        </label>
        <label>
          Vérification du mot de passe *
          <input type="password" />
        </label>
        <label>
          Conditions générales d'utilisation *
          <input type="checkbox" />
          <p>
            En cochant la présente case, je reconnais avoir pris connaissance et
            accepte les conditions générales d’utilisation
          </p>
        </label>
      </form>
    </div>
  );
}
