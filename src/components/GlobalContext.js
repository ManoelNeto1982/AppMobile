import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [id, setUserId] = useState("")
  const [email, setUserEmail] = useState("");
  const [name, setUserName] = useState("");
  const [bookId, setBookId] = useState("")

  const dataUserGlobalContext = {
    userId: id,
    userEmail: email,
    userName: name,
    bookId: bookId,
    setUserId,
    setUserEmail,
    setUserName,
    setBookId,
  };

  return (
    <AppContext.Provider value={dataUserGlobalContext}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobal = () => useContext(AppContext);

export default AppProvider;
