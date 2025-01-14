"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./checkout.module.css"
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import CartItem from '../../components/cartItem/item'
import { CartContext } from '../../utils/cartContext'
import { createOrderServer } from '../../utils/order'

const page = () => {

  const [error, setError] = useState({
    fullName: false,
    email: false,
    phone: false,
    country: false,
    city: false,
    zip: false,
    street: false
  })

  const [info, setInfo] = useState({
    fullname: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    zip: "",
    street: ""
  })

  const {getCartPrice,
    cartPrice,
    cartItems,
    getItems,
    userDB} = useContext(CartContext);

    const refreshItems = async() =>{
      await getItems();
    }

    useEffect(()=>{
      refreshItems();
    }, [userDB])


    const Submit = async(e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault(); 

      const formData = new FormData(e.currentTarget);
      const data: any = Object.fromEntries(formData.entries());
      setError((prev: any) => {
        return {
          fullName: data.fullname == "",
          email: data.email == "",
          phone: data.phone == "",
          country: data.country == "",
          city: data.city == "",
          zip: data.zip == "",
          street: data.street == ""
        }})
        
      if ((data.fullname != "") && (data.email != "") && (data.city != "") && (data.country != "") && (data.phone != "") && (data.street != "") && (data.zip != "") ) {
        console.log("data :", data);
        await createOrderServer(userDB.id, cartPrice, "PENDING", data, cartItems);
      }
    }

  return (
    <> 
   <Navbar />
   <section className={styles.section}>
    <article className={styles.orders}>
      <h1 className={styles.title}>Order Items</h1>
      <div className={styles.ordersGrid}>
          {
            cartItems.map((item: any)=>{
              return <CartItem key={item.id} item={item} />
            })
          }
      </div>
    </article>
    <article>
      <form onSubmit={Submit} className={styles.form}>
        <div className={styles.flex}>
          <label htmlFor="">Full Name:</label>
          <input placeholder='Name...' className={`${error.fullName ? styles.error : ""}`} name="fullname" type="text" />
        </div>

        <div className={styles.flex}>
          <label htmlFor="">Email: </label>
          <input placeholder='Email...' className={`${error.email ? styles.error : ""}`} name="email" type="text" />
        </div>

        <div className={styles.flex}>
          <label htmlFor="">Phone Number: </label>
          <input placeholder='Phone Number...' className={`${error.phone ? styles.error : ""}`} name="phone" type="text" />
        </div>

        <div className={styles.flex}>
          <div className={styles.flex}>
            <label htmlFor="">Country: </label>
            <input  className={`${error.country ? styles.error : ""}`} name="country" type="text" placeholder='Country...' />
          </div>

          <div className={styles.flex}>
            <label htmlFor="">City: </label>
            <input className={`${error.city ? styles.error : ""}`} name="city" type="text" placeholder='City...' />
          </div>
        </div>

        <div className={styles.flex}>
          <label htmlFor="">ZIP Code: </label>
          <input className={`${error.zip ? styles.error : ""}`} name="zip" type="text" placeholder='Zip' />
        </div>

        <div className={styles.flex}>
          <label htmlFor="">Street Address: </label>
          <input className={`${error.street ? styles.error : ""}`} name="street" type="text" placeholder='Adress...' />
        </div>

          <article className={styles.buy}>
            <div>
              <h1>Total + Shipping :</h1>
              <h3>${cartPrice + 4}</h3>
            </div>
            <button type='submit'>Buy Now</button>
          </article>
        </form>      
    </article>
   </section>
   <Footer /> 
    </>
  )
}

export default page