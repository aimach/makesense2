export default function Register() {
  return (
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
  );
}
