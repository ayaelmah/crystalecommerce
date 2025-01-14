"use client"
import React, { useEffect, useState } from 'react'
import styles from "./products.module.css"
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import { getProductsServer } from '../../utils/products'
import { getCategoriesServer } from '../../utils/categories'
import Product from '../../components/miniProduct/products'

const page = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState("");
    const [filtered, setFiltered] = useState([]);

    const getItems = async() =>{
        let res = await getProductsServer();
        setProducts(res);
        let cat = await getCategoriesServer();
        setCategories(cat);
        setFiltered(res);
    }

    useEffect(()=>{
        if(filter == ""){
            setFiltered(products);
        } else {
        let newProducts = products.filter((item: any)=> item.categoryId == filter);
        setFiltered(newProducts);
        } 
    }, [filter])

    useEffect(()=>{
        getItems();
    }, [])

    return (
    <>
    <Navbar />
        <section className={styles.products}>
            <h1 className={styles.title}>Products</h1>
            <section className={styles.productsFlex}>
                    <select value={filter} onChange={(e)=>setFilter(e.target.value)} name="" id="">
                        <option value="">All</option>
                        {
                            categories.map((item: any) =>{
                                return <option key={item.id} value={`${item.id}`}>{item.name}</option>
                            })
                        }
                    </select>
                <article className={styles.productsGrid}>
                    {
                        filtered.map((item: any)=>{
                            return <Product key={item.id} item={item} />
                        })
                    }
                </article>
            </section>
        </section>
    <Footer />
    </>
  )
}

export default page