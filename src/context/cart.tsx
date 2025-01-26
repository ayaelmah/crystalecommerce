"use client"
import { getCartItemsServer } from "@/server/cart";
import { Cart, CartItem } from "@prisma/client";
import { createContext, useState, ReactNode, useEffect } from "react";

interface CartContextType {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}

export const CartContext = createContext<any>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [openCart, setOpenCart] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  const getCartItems = async() =>{
    if(cart){
      const res = await getCartItemsServer(cart?.id);
      setCartItems(res);
    }
  }

  const getCartTotal = async() =>{
    let total = 0;
    cartItems?.forEach((item: any)=>{
      total += item.quantity * item.price;
    })
    setCartTotal(total);
  }

  useEffect(()=>{
    getCartTotal();
  }, [cartItems])

  useEffect(()=>{
    getCartItems();
  },[cart])

  return (
    <CartContext.Provider value={{ cart, setCart, cartItems, setCartItems, getCartItems, openCart, setOpenCart, cartTotal, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};