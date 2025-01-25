import React from 'react'
import styles from "./product.module.css"
import Image from 'next/image'
import Link from 'next/link'

const product = () => {
  return (
    <article className={styles.product}>
            <Image
            className={styles.mainImg}
            src="/images/main/bg1.jpg"
              height={2000}
              width={2000}
              alt="product"
            />
            <div className={styles.content}>
              <h1 className={styles.name}>product</h1>
              <h3 className={styles.price}>$50</h3>
              <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum labore voluptates inventore qui porro sit eaque quasi nemo consectetur ratione.</p>
              <Image
              className={styles.bookmark}
              src={"/images/icons/bookmark.png"}
                width={50}
                height={50}
                alt="bookmard"
              />
              <Link href={"/"}>
              <button>Buy Now</button>
              </Link>
            </div>
          </article>
  )
}

export default product