"use client"
import { getCategoriesServer, getProductsServer } from "@/server/product";
import { createContext, useEffect, useState } from "react";

export const ProductContext: any = createContext(null);

export const ProductProvider = ({ children }: {children: any}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getProducts = async() =>{
    const res: any = await getProductsServer();
    setProducts(res);
  }

  const getCategories = async() =>{
    const res: any = await getCategoriesServer();
    setCategories(res);
  }

  useEffect(()=>{
    getProducts();
    getCategories();
  }, [])

  return (
    <ProductContext.Provider value={{products, setProducts, getProducts, categories, setCategories, getCategories}}>
      {children}
    </ProductContext.Provider>
  );
};