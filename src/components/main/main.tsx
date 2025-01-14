"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./main.module.css"
import Link from 'next/link'
import Image from 'next/image'
import Product from "../miniProduct/products"
import { getFeaturedMain } from '../../utils/products'
import { CartContext } from '../../utils/cartContext'

const main = () => {

    const {getFavorites, userDB} = useContext(CartContext);
    const [featuredItems, setFeaturedItems] = useState([]);
    const [popularItems, setPopularItems] = useState([]);

    const getItems = async() =>{
        await getFavorites();
        const getFeatured: any = await getFeaturedMain();
        setFeaturedItems(getFeatured);
    }

    useEffect(()=>{
        getItems();
    }, [userDB])


    return (
    <main>
        <section className={styles.main}>
            <h1>Buy Moroccan Souvenirs</h1>
            <Link href="/products">
            <button>GO TO STORE</button>
            </Link>
        </section>
        <section className={styles.minisection}>
            <h1 className={styles.sectionTitle}>Features</h1>
            <article className={styles.productsGrid}>
                {
                    featuredItems.map((item: any) =>{
                        return <Product key={item.id} item={item} /> 
                    })
                }

            </article>
            <Link className={styles.visit} href="/">
                View More
            </Link>
        </section>
        <section className={styles.minisection}>
            <h1 className={styles.sectionTitle}>Popular Items</h1>
            <article className={styles.productsGrid}>
            {
                    featuredItems.map((item: any) =>{
                        return <Product  key={item.id} item={item} /> 
                    })
                }
            </article>
            <Link className={styles.visit} href="/">
                View More
            </Link>
        </section>
        <section className={styles.rateus}>
            <h1>Rate Us</h1>
            <article>
                <h3> <Link href="/rateus">Give Us your Feedback</Link></h3>
            </article>
        </section>
    </main>
  )
}

export default main