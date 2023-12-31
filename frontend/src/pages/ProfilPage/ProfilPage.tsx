import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useState } from "react";
import style from "./ProfilPage.module.scss";
import { Layers, Users, User } from "react-feather";

export default function ProfilPage() {
  const { profile } = useContext(UserContext);
  const [section, setSection] = useState<"decisions" | "groups" | "profil">(
    "profil"
  );
  return (
    profile !== null && (
      <div>
        <section className={style.headSection}>
          <div className={style.avatarSection}>
            <img
              src={profile.avatar as string}
              alt={`${profile.firstname} ${profile.lastname}`}
            />
            <div>
              <h3>
                {profile.firstname} {profile.lastname}
              </h3>
              <h4>
                {profile.position}, {profile.service.name}
              </h4>
            </div>
          </div>
          <nav className={style.menuSection}>
            <button
              onClick={() => setSection("decisions")}
              className={
                section === "decisions"
                  ? style.buttonStyleActive
                  : style.buttonStyle
              }
            >
              <Layers /> Mes décisions
            </button>
            <button
              onClick={() => setSection("groups")}
              className={
                section === "groups"
                  ? style.buttonStyleActive
                  : style.buttonStyle
              }
            >
              <Users /> Mes groupes
            </button>
            <button
              onClick={() => setSection("profil")}
              className={
                section === "profil"
                  ? style.buttonStyleActive
                  : style.buttonStyle
              }
            >
              <User />
              Mon profil
            </button>
          </nav>
        </section>
        <section>
          {section === "decisions" && <div>Mes décisions</div>}
          {section === "groups" && <div>Mes groupes</div>}
          {section === "profil" && <div>Mon profil</div>}
        </section>
      </div>
    )
  );
}
