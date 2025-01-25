"use client"
import React, { useState } from 'react'
import styles from "./navbar.module.css";
import Link from 'next/link';
import Image from 'next/image';
import Cart from '../cart/cart';

const navbar = () => {
    const [openNav, setOpenNav] = useState(false);
    const [openCart, setOpenCart] = useState(false);


  return (
    <>
    <Cart openCart={openCart} setOpenCart={setOpenCart} />
    <nav className={styles.nav}>
        <h1 className={styles.logo}>Sahara Sparkle</h1>
        <ul className={styles.links}>
        <li>
            <Link href={"/"}>Products</Link>
        </li>
        <li>
            <Link href={"/"}>Bookmarks</Link>
        </li>            
        <li>
            <Link href={"/contactus"}>Contact Us</Link>
        </li>            
        </ul>
        <div className={styles.icons}>
            <Image height={35} width={35} src={"/images/icons/user.png"} alt="user"></Image>
            <Image height={35} width={35} src={"/images/icons/dashboard.png"} alt="dashboard"></Image>
            <Image onClick={()=> setOpenCart(true)} height={35} width={35} src={"/images/icons/cart.png"} alt="user"></Image>
            <Image onClick={()=> setOpenNav(true)} className={styles.menu} height={35} width={35} src={"/images/icons/menu.png"} alt="menu"></Image>
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