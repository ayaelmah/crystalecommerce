"use client"
import React, {useState} from 'react'
import styles from "./cart.module.css"
import Image from 'next/image'
import CartItem from './cartItem'
import Link from 'next/link'

const cart = ({openCart, setOpenCart}: {openCart: any, setOpenCart: any}) => {

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
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        </article>
        <span className={styles.priceNum}>$30</span>
        <Link href="/checkout">
        <button className={styles.cartBtn}>Buy Now</button>
        </Link>
    </div>
  )
}

export default cart