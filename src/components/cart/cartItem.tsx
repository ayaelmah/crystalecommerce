"use client"
import React, { useContext, useState } from 'react'
import styles from "./cart.module.css";
import Image from 'next/image';
import { addCartItemServer, changeItemQuantityServer, deleteCartItemServer } from '@/server/cart';
import { CartContext } from '@/context/cart';
import { useRouter } from "next/router";


const cartItem = ({item}: {item: any}) => {
  const {getCartItems, setCartItems, cartItems} = useContext(CartContext);
  const [itemQuantity, setItemQuantity] = useState(item.quantity );

  const addItem = async() =>{
    const res = await changeItemQuantityServer(item.id, itemQuantity + 1);
    setItemQuantity(itemQuantity + 1);
    let data = cartItems;
    data = data.map((product: any)=>{
      if(product.id == item.id){
        return {...product, quantity: itemQuantity + 1};
      } else {
        return product;
      }
    })
    setCartItems(data);
  }

  const removeItem = async() =>{
    if(itemQuantity > 1){
      const res = await changeItemQuantityServer(item.id, itemQuantity - 1);
      setItemQuantity(itemQuantity - 1);
      let data = cartItems;
      data = data.map((product: any)=>{
        if(product.id == item.id){
          return {...product, quantity: itemQuantity - 1};
        } else {
          return product;
        }
      })
      setCartItems(data);

    } else {
      deleteItem();
    }
  }

  const deleteItem = async() =>{
    let data = cartItems;
    await deleteCartItemServer(item.id);
    data = data.filter((product: any) => product.id != item.id);
    setCartItems(data);
  }

  return (
          <div className={styles.cartItem}>
            <Image
            className={styles.itemImg} 
            src={item.imgUrl}
              height={1000}
              width={1000}
              alt='product'
            />
            <h3 className={styles.itemName}>{item.name}</h3>
            <h1 className={styles.itemPrice}>${item.price * itemQuantity}</h1>
            <div className={styles.change}>
              <Image
              src={"/images/icons/up.png"}
              height={30}
              width={30}
              alt='increase'
              onClick={()=> addItem()}
              />
              <span>{itemQuantity}</span>
              <Image
              src={"/images/icons/down.png"}
              height={30}
              width={30}
              alt='decrease'
              onClick={()=>removeItem()}
              />
            </div>
            <Image
            className={styles.delete}
              src={"/images/icons/delete.png"}
              height={30}
              width={30}
              alt='delete'
              onClick={()=>deleteItem()}
              />
          </div>
  )
}

export default cartItem