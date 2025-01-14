"use client"
import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import styles from "./admin.module.css"
import { useRouter } from 'next/navigation';
import { CartContext } from '../../utils/cartContext';


const admin = () => {

  const {userDB} = useContext(CartContext);
  const router = useRouter();

  useEffect(()=>{
    if(userDB.name && userDB && !userDB?.isAdmin){
      router.push('/');
    }
  }, [userDB])


  return (
    <nav className={styles.nav}>
    <Link href={`/dashboard/categories`}>Categories</Link>
    <Link href={`/dashboard/orders`}>Orders</Link>
    <Link href={`/dashboard/products`}>Products</Link>
    <Link href={`/dashboard/users`}>Users</Link>
</nav>
  )
}

export default admin