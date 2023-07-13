import logo from "../assets/img/logo.svg";
import style from "./LoginPage.module.scss";

export default function LoginPage() {
  return (
    <div>
      <img src={logo} alt="logo" />
      <h2 className={`${style.title}`}>Se connecter</h2>
    </div>
  );
}
