import { createContext, useEffect, useState } from "react";
import {
  getLocalStorage,
  getSessionStorage,
} from "../lib/helpers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firstRender, setFirstRender] = useState(true);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  /** Synchronizing with Local Storage */
  useEffect(() => {
    function setDataFromLocalStorage() {
      const userFromLocalStorage =
        getLocalStorage("user") || getSessionStorage("user");
      if (userFromLocalStorage) {
        setUser(userFromLocalStorage);
        setIsLogged(true);
      }
      setFirstRender(false);
    }
    if (firstRender) {
      setDataFromLocalStorage();
    }
  }, [firstRender]);

  const value = {
    user,
    setUser,
    isLogged,
    setIsLogged,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
