import { useState } from "react";
import logo from "../../assets/img/logo.svg";
import style from "./Navbar.module.scss";
import { Home, Calendar, Smile, Menu, User } from "react-feather";
import UserMenuModale from "../userMenuModale/UserMenuModale";

export default function Navbar() {
  const [openModale, setOpenModale] = useState(false);

  return (
    <header className={style.header}>
      <img src={logo} alt="logo" width={"100px"} />
      <nav>
        <ul>
          <li>
            <Home className={style.icon} />
            Parcourir les décisions
          </li>
          <li>
            <Calendar className={style.icon} />
            Mes décisions
          </li>
          <li>
            <Smile className={style.icon} />
            Notifications
          </li>
        </ul>
      </nav>
      <button onClick={() => setOpenModale(!openModale)}>
        <Menu />
        <User />
      </button>
      {openModale && <UserMenuModale />}
    </header>
  );
}
