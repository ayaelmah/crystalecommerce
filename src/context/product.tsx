"use client"
import { createContext, useState } from "react";

export const ProductContext: any = createContext(null);

export const ProductProvider = ({ children }: {children: any}) => {
  return (
    <ProductContext.Provider value={{}}>
      {children}
    </ProductContext.Provider>
  );
};