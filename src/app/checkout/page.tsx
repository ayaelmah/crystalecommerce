"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./checkout.module.css"
import CartItem from '@/components/cart/cartItem'
import { CartContext } from '@/context/cart'
import { createOrderServer, getCouponPecServer, useCouponServer } from '@/server/order'
import { UserContext } from '@/context/user'
import { useRouter } from "next/navigation";


const page = () => {
  const router = useRouter();
  const {cartItems, cartTotal} = useContext(CartContext);
  const {user}: any = useContext(UserContext);
  const [coupon, setCoupon] = useState<any>({
    percentage: 1
  });
  const [currentCoupon, setCurrentCoupon] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [newTotal, setNewTotal] = useState((cartTotal + 4) * coupon.percentage);

  // Coupon Functions
  const getCoupon = async() =>{
    let res: any = await getCouponPecServer(currentCoupon);
    if(res && res?.percentage){
      setCoupon(res);
      setNewTotal((cartTotal + 4) * coupon.percentage);
    } else {
      setCoupon({percentage: 1});
    }
  }

  // Order Functions
  const createOrder = async() =>{
    const res: any = await createOrderServer(user.id, name, email, phone, address, newTotal , cartItems);
    if(coupon.code){
      const useCoupon = await useCouponServer(coupon.code, coupon.uses + 1);
    }

    router.push(`/checkout/${res.id}`);
  }

  // UseEffect
  useEffect(()=>{
    if(currentCoupon == "") {
      setCoupon({percentage: 1});
    };
  }, [currentCoupon]);

  useEffect(()=>{
    setNewTotal((cartTotal + 4) * coupon.percentage);
  }, [coupon, cartTotal])

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
            <input value={name} onChange={(e: any)=> setName(e.target.value)} placeholder='Name...' type="text" />
            <h3>Email: </h3>
            <input value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder='Email...' type="text" />
            <h3>Street Adress:</h3>
            <input value={address} onChange={(e: any) => setAddress(e.target.value)} placeholder='Address...' type="text" />
            <h3>Phone Number: </h3>
            <input value={phone} onChange={(e: any) => setPhone(e.target.value)} placeholder='Phone Number...' type="text" />
          </form>
        </article>
        <div className={styles.pricing}>
          <h1 className={styles.pricingTitle}>Price: </h1>
          <h3>Products total: ${cartTotal}</h3>
          <h3>Shipping: $4</h3>
          <h3>Total: ${newTotal.toFixed(2)}</h3>
          <div className={styles.coupons}>
            <h3>Coupons: </h3>
            {coupon.percentage != 1 ? <p style={{ color: "white" }}>%{coupon.percentage * 100}</p> : ""}
            <button onClick={()=> getCoupon()} className={styles.applyBtn}>Apply</button>
            <input value={currentCoupon} onChange={(e: any) => setCurrentCoupon(e.target.value)} type="text" name="" id="" />
          </div>
          <button onClick={()=> createOrder()}>Buy Now</button>
        </div>
      </div>
    </section>
  )
}

export default page