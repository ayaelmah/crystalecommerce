"use content"
import React, { useContext, useEffect } from 'react'
import styles from "./cart.module.css"
import Image from 'next/image'
import CartItem from "../cartItem/item"
import { CartContext } from '../../utils/cartContext'
import Link from 'next/link'



const cart = () => {

    const {
      cartPrice,
      getCartPrice,
      cartItems,
      getItems,
      openCart,
      setOpenCart,
    } = useContext(CartContext);

    const refreshCart = async()=>{
      getCartPrice();
    }

    useEffect(()=>{
      refreshCart();
    }, [cartItems])




  return (
    <div className={`${styles.cartCover} ${openCart ? styles.open : ''}`}>
        <article className={styles.cart}>
            <Image
             width={40}
             height={40}
             src={"/close.png"}
             alt='close'
             onClick={()=> setOpenCart(false)}
            />
            <div className={styles.cartGrid}>
              {
                cartItems?.map((item: any, index: any) =>{
                  return <CartItem key={index} item={item} />
                })
              }
            </div>
            <h3 className={styles.price}>${cartPrice}</h3>
            <Link href="/checkout">
            <button className={styles.cartBtn}>Buy Items</button>
            </Link>

        </article>
    </div>
  )
}

export default cart