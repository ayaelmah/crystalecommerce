"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./product.module.css"
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { getProductIdServer } from '@/server/product'
import { UserContext } from '@/context/user'
import { addBookMarkServer, removeBookMarkServer } from '@/server/user'

const page = () => {

  const {id}: {id: string} = useParams();
  const [product, setProduct] = useState<any>();
  const {bookMarks, getBookMarks, user}: any = useContext(UserContext);
  const [inBookMarks, setInBookMarks] = useState(false);

  const getProduct = async() =>{
    if(id){
      const res: any = await getProductIdServer(id);
      setProduct(res);
    }
  }

  // Bookmark Functions
  const addBookMark = async() =>{
    const res = await addBookMarkServer(user.id, product.id);
    await getBookMarks();
  }

  const removeBookMark = async() =>{
    const res = await removeBookMarkServer(user.id, product.id);
    await getBookMarks();
  }
  // UseEffects
useEffect(()=>{
    let doesItem = bookMarks?.find((bookmark: any) => product.id == bookmark.productId);
    if(doesItem && doesItem?.id){
      setInBookMarks(true);
    } else {
      setInBookMarks(false);
    }
  }, [bookMarks])

  useEffect(()=>{
    getProduct();
  }, [])

  return (
    <div>
      {
        product?.imgUrl &&<article className={styles.product}>
            <Image
            className={styles.productImg}
            src={product?.imgUrl}
            height={700}
            width={500}
            alt='product'
            />
            <div className={styles.content}>
                <h1 className={styles.name}>{product.name}</h1>
                <h3 className={styles.price}>${product.price}</h3>
                <h3 className={styles.mes}>Height: {product.height}</h3>
                <h3 className={styles.mes}>Width: {product.width}</h3>
                <h3 className={styles.desc}>Description: </h3>
                <p>{product.description}</p>
                {
                !inBookMarks ? <Image
                onClick={()=> addBookMark()}
              className={styles.bookmark}
              src={"/images/icons/bookmark.png"}
                width={50}
                height={50}
                alt="bookmark" /> : <Image
                onClick={()=> removeBookMark()}
              className={styles.bookmark}
              src={"/images/icons/redbookmark.png"}
                width={50}
                height={50}
                alt="red bookmard"
              />
              
              }
                <button>Buy Now</button>
            </div>
        </article>
      }
        

    </div>
  )
}

export default page