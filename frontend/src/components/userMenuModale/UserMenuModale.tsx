import { Link } from "react-router-dom";

export default function UserMenuModale() {
  return (
    <div>
      <Link to={"/connexion"}>Connexion</Link>
      <Link to={"/connexion"}>Inscription</Link>
      <Link to={"/decisions/create"}>Publier une décision</Link>
    </div>
  );
}
