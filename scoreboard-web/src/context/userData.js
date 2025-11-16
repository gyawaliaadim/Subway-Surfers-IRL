"use client";
import { createContext, useContext, useState } from "react";

const UserDataContext = createContext(null);

export function UserDataContextProvider({ children }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");

  return (
    <UserDataContext.Provider
      value={{
        name,
        setName,
        age,
        setAge,
        id,
        setId,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataContextProvider");
  }
  return context;
}
