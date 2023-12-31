import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useState } from "react";

export default function ProfilPage() {
  const { profile } = useContext(UserContext);
  const [section, setSection] = useState<"decisions" | "groups" | "profil">(
    "profil"
  );
  console.log(profile);
  return (
    profile !== null && (
      <div>
        <section>
          <div>
            <img
              src={profile.avatar as string}
              alt={`${profile.firstname} ${profile.lastname}`}
            />
            <h3>
              {profile.firstname} {profile.lastname}
            </h3>
            <h4>
              {profile.position}, {profile.service.name}
            </h4>
          </div>
        </section>
        <section>
          <nav>
            <button onClick={() => setSection("decisions")}>
              Mes décisions
            </button>
            <button onClick={() => setSection("groups")}>Mes groupes</button>
            <button onClick={() => setSection("profil")}>Mon profil</button>
          </nav>
          {section === "decisions" && <div>Mes décisions</div>}
          {section === "groups" && <div>Mes groupes</div>}
          {section === "profil" && <div>Mon profil</div>}
        </section>
      </div>
    )
  );
}
