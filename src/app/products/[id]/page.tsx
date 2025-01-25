import React from 'react'
import styles from "./product.module.css"
import Image from 'next/image'

const page = () => {
  return (
    <div>
        <article className={styles.product}>
            <Image
            className={styles.productImg}
            src={"/images/main/bg1.jpg"}
            height={700}
            width={500}
            alt='product'
            />
            <div className={styles.content}>
                <h1 className={styles.name}>Name: </h1>
                <h3 className={styles.price}>$45</h3>
                <h3 className={styles.mes}>Height: 40</h3>
                <h3 className={styles.mes}>Width: 50</h3>
                <h3 className={styles.mes}>Color: 50</h3>
                <h1 className={styles.rating}>Rating: 0</h1>
                <h3 className={styles.desc}>Description: </h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quod illum. Sed nostrum quaerat placeat eligendi, dicta quidem soluta ratione tenetur beatae qui odit a quae? Placeat quae quisquam reprehenderit.</p>
                <button>Buy Now</button>
            </div>
        </article>
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