"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./product.module.css"
import Image from 'next/image'
import Link from 'next/link'
import { CartContext } from '@/context/cart'
import { addCartItemServer } from '@/server/cart'
import { UserContext } from '@/context/user'
import { addBookMarkServer, removeBookMarkServer } from '@/server/user'

const product = ({item}: {item: any}) => {
  const [disabled, setDisabled] = useState(false);
  const {cart, cartItems, getCartItems, setOpenCart}: any = useContext(CartContext);
  const {user}: any = useContext(UserContext);
  const {bookMarks, getBookMarks}: any = useContext(UserContext);
  const [inBookMarks, setInBookMarks] = useState(false);
  

  // useEffects
  useEffect(()=>{
    let doesItem = cartItems?.find((cartItem: any) => item.id == cartItem.productId);
    if(doesItem && doesItem?.id){
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [cartItems])

  useEffect(()=>{
    let doesItem = bookMarks?.find((bookmark: any) => item.id == bookmark.productId);
    if(doesItem && doesItem?.id){
      setInBookMarks(true);
    } else {
      setInBookMarks(false);
    }
  }, [bookMarks])

  // Cart Functions
  const addtoCart = async() =>{
    const res = await addCartItemServer(cart.id, item.id, item.name, item.imgUrl, 1, item.price);
    await getCartItems();
    setOpenCart(true);
  }

  // Bookmark Functions
  const addBookMark = async() =>{
    const res = await addBookMarkServer(user.id, item.id);
    await getBookMarks();
  }

  const removeBookMark = async() =>{
    const res = await removeBookMarkServer(user.id, item.id);
    await getBookMarks();
  }

  return (
    <article className={styles.product}>
      <Link href={`/products/${item.id}`}>
            <Image
            className={styles.mainImg}
            src={item.imgUrl}
              height={2000}
              width={2000}
              alt="product"
            />
      </Link>
            <div className={styles.content}>
              <h1 className={styles.name}>{item.name}</h1>
              <h3 className={styles.price}>${item.price}</h3>
              <p className={styles.desc}>{item.desc}</p>
              {
                !inBookMarks ? <Image
                onClick={()=> addBookMark()}
              className={styles.bookmark}
              src={"/images/icons/bookmark.png"}
                width={50}
                height={50}
                alt="bookmark" /> : <Image
                onClick={()=> removeBookMark()}
              className={styles.bookmark}
              src={"/images/icons/redbookmark.png"}
                width={50}
                height={50}
                alt="red bookmard"
              />
              
              }
              
              <button className={`${disabled? styles.disabled : ""}`} onClick={()=> addtoCart()} disabled={disabled}>Buy Now</button>
            </div>
          </article>
  )
}

export default product