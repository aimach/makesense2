import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import style from "./Navbar.module.scss";
import { Home, Calendar, Smile, Menu, User } from "react-feather";
import UserMenuModale from "../userMenuModale/UserMenuModale";

export default function Navbar() {
  const [openModale, setOpenModale] = useState(false);

  return (
    <header className={style.header}>
      <Link to="/home">
        <img src={logo} alt="logo" width={"100px"} />
      </Link>
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
      <button
        className={style.userMenuButton}
        onClick={() => setOpenModale(!openModale)}
      >
        <Menu />
        <User className={style.userMenuButtonUserIcon} />
      </button>
      {openModale && <UserMenuModale />}
    </header>
  );
}
