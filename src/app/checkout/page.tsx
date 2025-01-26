"use client"
import React, { useContext } from 'react'
import styles from "./checkout.module.css"
import CartItem from '@/components/cart/cartItem'
import { CartContext } from '@/context/cart'

const page = () => {
  const {cartItems, cartTotal} = useContext(CartContext);
  return (
    <section className={styles.checkout}>
      <h1 className={styles.title}>Checkout</h1>
      <div className={styles.checkoutGrid}>
        <article>
          <div className={styles.cartItems}>
            {
              cartItems?.map((item: any)=>{
                return <CartItem key={item.id} item={item} />
              })
            }
          </div>
          <form action="">
            <h3>Name: </h3>
            <input placeholder='Name...' type="text" name="" id="" />
            <h3>Email: </h3>
            <input placeholder='Email...' type="text" name="" id="" />
            <h3>Street Adress:</h3>
            <input placeholder='Address...' type="text" name="" id="" />
            <h3>Phone Number: </h3>
            <input placeholder='Phone Number...' type="text" name="" id="" />
          </form>
        </article>
        <div className={styles.pricing}>
          <h1 className={styles.pricingTitle}>Price: </h1>
          <h3>Products total: ${cartTotal}</h3>
          <h3>Shipping: $4</h3>
          <h3>Total: ${cartTotal + 4}</h3>
          <div className={styles.coupons}>
            <h3>Coupons: </h3>
            <button className={styles.applyBtn}>Apply</button>
            <input type="text" name="" id="" />
          </div>
          <button>Buy Now</button>
        </div>
      </div>
    </section>
  )
}

export default page