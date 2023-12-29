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
  // logout: () => void;
  // redirectToLogin: () => void;
  // loaded: boolean;
}

export const UserContext = createContext<ContextProps>({
  profile: null,
  isAuthenticated: () => false,
  // logout: () => {},
  // redirectToLogin: () => {},
  // loaded: false,
});

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

  // const logout = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/auth/logout");
  //     const data = await response.json();
  //     console.log(data);
  //     setProfile(null);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const redirectToLogin = () => {
  //   if (loaded && profile == null) {
  //     navigate("/auth/login");
  //   }
  // };

  return (
    <UserContext.Provider value={{ profile, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
