"use client"
import { createContext, useState } from "react";

export const UserContext: any = createContext(null);

export const UserProvider = ({ children }: {children: any}) => {
  const [user, setUser] = useState<any>();

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};