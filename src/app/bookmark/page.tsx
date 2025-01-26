"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./bookmark.module.css"
import Product from '@/components/product/product'
import { UserContext } from '@/context/user'
import { ProductContext } from '@/context/product'

const bookmark = () => {
  const {bookMarks}: any = useContext(UserContext);
  const {products}: any = useContext(ProductContext);
  const [bookMarkProducts, setBookMarkProducts] = useState<any>([]);

  const findBookMarkedItems = async() =>{
    let data = bookMarks;
    data = data?.map((item: any)=>{
      let res: any = products.find((product: any)=> product.id == item.productId);
      console.log("result : ", res);
      return res;
    })
    setBookMarkProducts(data);
  }

  useEffect(()=>{
    findBookMarkedItems();
  }, [bookMarks])
  return (
    <section className={styles.bookmark}>
      <h1 className={styles.title}>Bookmarks</h1>
      <div className={styles.bookmarkGrid}>
          {
            bookMarkProducts?.map((item: any)=>{
              if(item){
                return <Product key={item.id} item={item} />
              }
            })
          }     
      </div>
    </section>
  )
}

export default bookmark