"use client"
import React, { useEffect, useState } from 'react'
import styles from "./product.module.css"
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { getProductIdServer } from '@/server/product'

const page = () => {

  const {id}: {id: string} = useParams();
  const [product, setProduct] = useState<any>();

  const getProduct = async() =>{
    if(id){
      const res: any = await getProductIdServer(id);
      setProduct(res);
    }
  }

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
                <h1 className={styles.rating}>Rating: 0</h1>
                <h3 className={styles.desc}>Description: </h3>
                <p>{product.description}</p>
                <button>Buy Now</button>
            </div>
        </article>
      }
        
        <article className={styles.reviews}>
          <div className={styles.submitReview}>
            <h1>Give your review !</h1>
            <select name="" id="">
              <option value="">1</option>
            </select>
            <textarea name="" id=""></textarea>
            <button>Add Review</button>
          </div>

          <section className={styles.comments}>
            <div className={styles.review}>
              <h1>Review : 5</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam suscipit harum minus sunt! Alias fugit velit minima iure ex saepe.
              </p>
            </div>
          </section>
        </article>
    </div>
  )
}

export default page