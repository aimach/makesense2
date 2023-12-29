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
      <Link to="/">
        <img src={logo} alt="logo" width={"100px"} />
      </Link>
      <div className={style.headerMenu}>
        <nav>
          <ul>
            <li>
              <Home className={style.icon} />
              <p>Parcourir les décisions</p>
            </li>
            <li>
              <Calendar className={style.icon} />
              <p>Mes décisions</p>
            </li>
            <li>
              <Smile className={style.icon} />
              <p>Notifications</p>
            </li>
          </ul>
        </nav>
        <button
          className={style.userMenuButton}
          onClick={() => setOpenModale(!openModale)}
        >
          <Menu className={style.userMenuButtonMenuIcon} />
          <User className={style.userMenuButtonUserIcon} />
        </button>
        {openModale && <UserMenuModale />}
      </div>
    </header>
  );
}
