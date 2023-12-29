import { ReactNode, useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../utils/types";
import axios from "axios";
import Cookies from "js-cookie";

interface ProviderProps {
  children?: ReactNode;
}

interface ContextProps {
  isAuthenticated: () => boolean;
  profile: UserType | null;
  logout: () => void;
}

export const UserContext = createContext<ContextProps>({} as ContextProps);

export const UserProvider = ({ children }: ProviderProps) => {
  // useState
  const [profile, setProfile] = useState<UserType | null>(null);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async (): Promise<void> => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL as string}/my-profile`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("token") as string}`,
            },
          }
        );
        setLoaded(true);
        if (response.status === 200) {
          setProfile(response.data as UserType);
        }
      } catch (err) {
        console.error(err);
        setLoaded(true);
      }
    };
    checkUserSession();
  }, []);

  const isAuthenticated = () => {
    return profile !== null;
  };

  const logout = async (): Promise<void> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL as string}/logout`,
        {
          withCredentials: true,
        }
      );
      Cookies.remove("token");
      if (response.status === 200) setProfile(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ profile, isAuthenticated, logout }}>
      {children}
    </UserContext.Provider>
  );
};
