import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [id, setUserId] = useState("")
  const [email, setUserEmail] = useState("");
  const [name, setUserName] = useState("");

  const dataUserGlobalContext = {
    userId: id,
    userEmail: email,
    userName: name,
    setUserId,
    setUserEmail,
    setUserName,
  };

  return (
    <AppContext.Provider value={dataUserGlobalContext}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobal = () => useContext(AppContext);

export default AppProvider;
