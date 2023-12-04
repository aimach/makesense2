import { useEffect, useState } from "react";
import { Search, Tag, Calendar, ChevronDown } from "react-feather";
import style from "./Searchbar.module.scss";
import "./Searchbar.module.scss";
import { StatusType } from "../../utils/types";
import axios from "axios";

interface IFilters {
  text: string;
  status: number[] | [];
  date: string;
}

export default function Searchbar() {
  const [status, setStatus] = useState<StatusType[] | []>([]);
  const [displayStatusModal, setDisplayStatusModal] = useState<boolean>(false);

  const [filters, setFilters] = useState<IFilters>({
    text: "",
    status: [],
    date: "",
  });

  function addStatus(event: React.ChangeEvent<HTMLInputElement>) {
    const newStatus: number[] = [
      ...filters.status,
      parseInt(event.target.id, 10),
    ];
    setFilters({ ...filters, status: newStatus });
  }

  function removeStatus(event: React.ChangeEvent<HTMLInputElement>) {
    const newStatus: number[] = filters.status.filter(
      (item) => item !== parseInt(event.target.id, 10)
    );
    setFilters({ ...filters, status: newStatus });
  }

  console.log(filters.status);

  useEffect(() => {
    axios
      .get<StatusType[]>(`${import.meta.env.VITE_BACKEND_URL as string}/status`)
      .then((res) => setStatus(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className={style.homeSearchBar}>
        <form>
          <input
            type="text"
            placeholder="Mots clés..."
            className={style.emptyInputStyle}
          />
          <div className={`${style.searchSelect} ${style.emptyInputStyle}`}>
            <Tag />
            <p>Statut</p>
            <ChevronDown
              onClick={() => setDisplayStatusModal(!displayStatusModal)}
            />
          </div>
          <div className={style.searchSelect}>
            <Calendar />
            Date
            <ChevronDown />
          </div>
          <button type="submit" className={style.buttonSearch}>
            <Search />
          </button>
        </form>
        {displayStatusModal && status && (
          <div className={style.selectModal}>
            {status.map((item: StatusType) => (
              <div key={item.id}>
                <input
                  type="checkbox"
                  id={item.id.toString()}
                  name={item.name}
                  onChange={(event) => {
                    if (event.target.checked) {
                      addStatus(event);
                    } else {
                      removeStatus(event);
                    }
                  }}
                />
                <label htmlFor={item.id.toString()}>{item.name}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
