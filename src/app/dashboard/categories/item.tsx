"use client"
import React from 'react'
import Image from 'next/image'
import styles from "./categories.module.css"
import { removeCategoriesServer } from '../../../utils/categories';

const item = ({category, getCategories}) => {

 const removeCategory = async() =>{
    await removeCategoriesServer(category.id);
    await getCategories();
 }

  return (
            <article className={styles.category}>
                <h2>{category?.name}</h2>
                <h2>
                  <Image
                  onClick={()=> removeCategory()}
                  src={"/trash.png"}
                  width={30}
                  height={30}
                  alt="category"
                  />
                </h2>
            </article>
  )
}

export default item