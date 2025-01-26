"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./navbar.module.css";
import Link from 'next/link';
import Image from 'next/image';
import Cart from '../cart/cart';
import {
    UserButton,
    useUser
  } from '@clerk/nextjs'
import {  createUserServer } from '@/server/user';
import { CartContext, CartProvider } from '@/context/cart';
import { UserContext } from '@/context/user';


const navbar = () => {
    const [openNav, setOpenNav] = useState(false);
    const {openCart, setOpenCart} : any = useContext(CartContext);
    const {cart, setCart}: any = useContext(CartContext);
    const {user, setUser}: any = useContext(UserContext);
    const userCl = useUser().user;
    
    const getUserAndCart = async() =>{
        if(userCl?.fullName && userCl?.primaryEmailAddress && userCl?.id){
            const res = await createUserServer(userCl?.fullName,  userCl.primaryEmailAddress.emailAddress as unknown as string, userCl?.id);
            setCart(res.cart);
            setUser(res.user);
        }
    }

    useEffect(()=>{
        if(userCl && userCl?.id) {
            getUserAndCart();
        }
    }, [userCl])

  return (
    <>
    <Cart />
    <nav className={styles.nav}>
        <Link href="/">
        <h1 className={styles.logo}>Sahara Sparkle</h1>
        </Link>
        <ul className={styles.links}>
        <li>
            <Link href={"/products"}>Products</Link>
        </li>
        <li>
            <Link href={"/bookmark"}>Bookmarks</Link>
        </li>            
        <li>
            <Link href={"/contactus"}>Contact Us</Link>
        </li>            
        </ul>
        <div className={styles.icons}>
            <Link href={"/profile"}>
                <Image height={35} width={35} src={"/images/icons/user.png"} alt="user"></Image>
            </Link>
            <Image height={35} width={35} src={"/images/icons/dashboard.png"} alt="dashboard"></Image>
            <Image onClick={()=> setOpenCart(true)} height={35} width={35} src={"/images/icons/cart.png"} alt="user"></Image>
            <Image onClick={()=> setOpenNav(true)} className={styles.menu} height={35} width={35} src={"/images/icons/menu.png"} alt="menu"></Image>
        <UserButton />
        </div>
    </nav>

    <nav className={styles.responsive+ " " + `${openNav ? styles.open : ""}`}>
        <Image
        width={70}
        height={70}
        alt='close'
        src={"/images/icons/remove.png"}
        onClick={()=> setOpenNav(false)}
        />
        <ul className={styles.respLinks}>
        <li>
            <Link href={"/"}>Category1</Link>
        </li>
        <li>
            <Link href={"/"}>Category1</Link>
        </li>            
        <li>
            <Link href={"/"}>Category1</Link>
        </li>            
        <li>
            <Link href={"/"}>Category1</Link>
        </li>
        </ul>
    </nav>
    
    </>
  )
}

export default navbar