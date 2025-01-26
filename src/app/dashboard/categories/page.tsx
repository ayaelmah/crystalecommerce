"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./categories.module.css"
import Image from 'next/image'
import { ProductContext } from '@/context/product'
import { createCategoryServer, deleteCategoryServer } from '@/server/product'

const page = () => {

  const {categories, getCategories}: any = useContext(ProductContext);
  const [name, setName] = useState("");

  const createCategory = async(e: any) =>{
    e.preventDefault();
    if (name){
      await createCategoryServer(name);
      await getCategories();
      setName("");
    }
  }

  const deleteCategory = async(id: string) =>{
    await deleteCategoryServer(id);
    await getCategories();
  }


  return (
    <section className={styles.categories}>
      <h3 className={styles.title}>Categories</h3>
      <form onSubmit={createCategory}>
        <input value={name} onChange={(e: any)=>setName(e.target.value)} type="text" />
        <button>Create</button>
      </form>

      <div className={styles.table}>
        <article>
          <h3>Name</h3>
          <h3>Delete</h3>
        </article>
        {
          categories?.map((item: any)=>{
            return <article key={item.id}>
              <h3>{item.name}</h3>
              <h3>
                <Image
                onClick={()=> deleteCategory(item.id)}
                src={"/images/icons/delete.png"}
                width={30}
                height={30}
                alt="delete"
                />                
              </h3>
            </article>
          })
        }
      </div>
    </section>
  )
}

export default page