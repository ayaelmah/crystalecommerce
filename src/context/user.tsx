"use client"
import { getBookMarksServer } from "@/server/user";
import { createContext, useEffect, useState } from "react";

export const UserContext: any = createContext(null);

export const UserProvider = ({ children }: {children: any}) => {
  const [user, setUser] = useState<any>();
  const [bookMarks, setBookMarks] = useState<any>();

  const getBookMarks = async()=>{
    if(user && user?.id){
      const res = await getBookMarksServer(user.id);
      setBookMarks(res);
    }
  }

  useEffect(()=>{
    getBookMarks();
  }, [user])

  return (
    <UserContext.Provider value={{user, setUser, bookMarks, getBookMarks}}>
      {children}
    </UserContext.Provider>
  );
};