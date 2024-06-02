import React, { createContext, useState } from "react";
//create Context
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  return (
    <AppContext.Provider
      value={{
        setIsAuth,
        isAuth,
        loading,
        setIsLoading,
        user,
        setUser,
        userName,
        setUserName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
