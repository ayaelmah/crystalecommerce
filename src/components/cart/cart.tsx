"use client"
import React, {useContext, useState} from 'react'
import styles from "./cart.module.css"
import Image from 'next/image'
import CartItem from './cartItem'
import Link from 'next/link'
import { CartContext } from '@/context/cart'

const cart = () => {
  const {openCart, setOpenCart, cartItems, getCartItems, cartTotal} = useContext(CartContext);



  return (
    <div className={styles.cart + " " + `${openCart ? styles.back : ""}`}>
        <Image
        onClick={()=> setOpenCart(false)}
        className={styles.close}
        src={"/images/icons/remove.png"}
        width={60}
        height={60}
        alt=''
        />
        <article className={styles.cartItems}>
          {
            cartItems?.map((item: any)=>{
              return <CartItem key={item.id} item={item} />
            })
          }
        </article>
        <span className={styles.priceNum}>${cartTotal}</span>
        <Link href="/checkout">
        <button className={styles.cartBtn}>Buy Now</button>
        </Link>
    </div>
  )
}

export default cart