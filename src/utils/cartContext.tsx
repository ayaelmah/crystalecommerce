"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCartItemsServer, getProductsIds } from './cart';
import { getFavoritesServer } from './favourite';
import { Cart, Category, Product, User } from '@prisma/client';

interface CartItem {
  id: string;
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface CartContextType {
  getCartPrice: Function;
  cartPrice: number;
  cartItems: CartItem[];
  getItems: () => Promise<void>;
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  getFavorites: () => Promise<void>;
  favorites: Favorites[];
  favoritesItems: Product[];
  userDB: any;
  setUserDB: React.Dispatch<React.SetStateAction<any>>; 
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

interface Favorites {
  id: number;
  userId: number;
  productId: number;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [cartPrice, setCartPrice] = useState<number>(0);
  const [favorites, setFavorites] = useState<Favorites[]>([]);
  const [favoritesItems, setFavoritesItems] = useState<Product[]>([]);
  const [userDB, setUserDB] = useState<any>({
    id: 0,
    name: "",
    email: "",
    clerkId: "",
    imgUrl: "",
    isAdmin: false
  });
  const [cart, setCart] = useState<Cart>({
    id: 0,
    userId: 0
  });

  const getItems = async() =>{
    const data: any = await getCartItemsServer(cart?.id);
    await setCartItems(data);
    getCartPrice();
    return data
  }


  const getFavorites = async() =>{
    const data: any = await getFavoritesServer(userDB.id);
    let products = data.map((item: any) => item.productId);
    products = await getProductsIds(products);
    setFavorites(data);
    setFavoritesItems(products);
    return products;
  }



  const getCartPrice = async() =>{
    const price = cartItems.reduce(
      (total: number, item: any) => total + (item.price * item.quantity),
      0
    );
    setCartPrice(price);
  }

  return (
    <CartContext.Provider
      value={{
        getCartPrice,
        cartPrice,
        cartItems,
        getItems,
        openCart,
        setOpenCart,
        setCartItems,
        getFavorites,
        favorites,
        favoritesItems,
        userDB,
        setUserDB,
        cart,
        setCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};