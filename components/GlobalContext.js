import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [email, setUserEmail] = useState("");
  const [name, setUserName] = useState("");

  const anotherUserData = {
    userEmail: email,
    userName: name,
    setUserEmail,
    setUserName,
  };
  return (
    <AppContext.Provider value={anotherUserData}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobal = () => useContext(AppContext);

export default AppProvider;
