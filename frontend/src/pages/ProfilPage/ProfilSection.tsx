import style from "./ProfilPage.module.scss";
import { useState, useEffect, useContext } from "react";
import { ServiceType } from "../../utils/types";
import { getServices } from "../../utils/api/serviceApi";
import { UserContext } from "../../context/UserContext";
import { UserType } from "../../utils/types";
import { AlertCircle } from "react-feather";

export default function ProfilSection() {
  const { profile } = useContext(UserContext);

  const [services, setServices] = useState<void | ServiceType[]>([]);
  const [newUser, setNewUser] = useState<UserType>(profile as UserType);

  useEffect(() => {
    getServices()
      .then((res) => {
        setServices(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("form submited");
  };
  return (
    <section className={style.profilSection}>
      <div>
        <h3>
          <AlertCircle /> Qui suis-je ?
        </h3>
        <p>
          Ces informations permettent aux autres utilisateurs de la plateforme
          de mieux te connaître
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Prénom *</label>
        <input
          type="text"
          name="firstname"
          value={newUser.firstname}
          className={style.inputStyle}
          required
        />
        <label>Nom de famille *</label>
        <input
          type="text"
          name="lastname"
          value={newUser.lastname}
          className={style.inputStyle}
          required
        />
        <label>Poste occupé *</label>
        <input
          type="text"
          name="position"
          value={newUser.position}
          className={style.inputStyle}
          required
        />
        <label>Service *</label>
        <select name="serviceId" className={style.inputStyle}>
          <option key={newUser.serviceId} value={newUser.serviceId}>
            {newUser.service.name}
          </option>
          {services?.map((service) => {
            return (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            );
          })}
        </select>
        <label>Avatar</label>
        <input type="file" name="avatar" id="avatar" />
        <button type="submit" className={style.buttonStyle}>
          Enregistrer
        </button>
      </form>
    </section>
  );
}
