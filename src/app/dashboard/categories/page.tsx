"use client"
import React, { useEffect, useState } from 'react'
import styles from "./categories.module.css"
import Link from 'next/link'
import Navbar from '../../../components/navbar/navbar'
import Footer from '../../../components/footer/footer'
import AdminNav from '../../../components/adminDashboard/admin'
import Image from 'next/image'
import Item from './item'
import { createCategoriesServer, getCategoriesServer } from '../../../utils/categories'

const page = () => {
  const [categories, setCategories] = useState<any>([]);
  const [newC, setNewC] = useState("");

  const getCategories = async() =>{
    let res: any = await getCategoriesServer();
    setCategories(res);
  }

  const createCategory = async(e) =>{
    e.preventDefault();
    await createCategoriesServer(newC);
    await getCategories();
  }

  useEffect(()=>{
    getCategories();
  }, [])

  return (
   <>
    <Navbar />
    <AdminNav />
    <section className={styles.categories}>
      <h1 className={styles.title}>
        Categories
      </h1>

      <form  className={styles.form} onSubmit={createCategory}>
        <input value={newC} onChange={(e)=>setNewC(e.target.value)} type="text" />
        <button>Create</button>
      </form>

      <div className={styles.categoriesGrid}>
        {
          categories.map((category: any)=>{
            return <Item key={category.id} getCategories={getCategories} category={category} />
          })
        }
      </div>
    </section>
    <Footer />
   </>
  )
}

export default page