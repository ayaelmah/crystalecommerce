"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./favorites.module.css"
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import MiniProduct from '../../components/miniProduct/products'
import { CartContext } from '../../utils/cartContext'

const page = () => {
    const {
        getFavorites,
        favorites,
        favoritesItems,
        userDB
    } = useContext(CartContext);


    useEffect(()=>{
        getFavorites();
        console.log("favorites :", favorites)
    }, [userDB])
  return (
    <>
    <Navbar />
    <section className={styles.favorites}>
        <h1 className={styles.title}>Favorites</h1>
        <div className={styles.favoritesGrid}>
            {
                favoritesItems.map((item: any)=>{
                    return <MiniProduct key={item.id} item={item} />
                })
            }
        </div>
    </section>
    <Footer />
    </>
  )
}

export default page