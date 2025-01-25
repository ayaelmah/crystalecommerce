"use client"
import { getProductsServer } from "@/server/product";
import { createContext, useEffect, useState } from "react";

export const ProductContext: any = createContext(null);

export const ProductProvider = ({ children }: {children: any}) => {
  const [products, setProducts] = useState([]);

  const getProducts = async() =>{
    const res: any = await getProductsServer();
    setProducts(res);
  }

  useEffect(()=>{
    getProducts();
  }, [])

  return (
    <ProductContext.Provider value={{products, setProducts, getProducts}}>
      {children}
    </ProductContext.Provider>
  );
};