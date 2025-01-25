import React from 'react'
import styles from "./product.module.css"
import Image from 'next/image'
import Link from 'next/link'

const product = ({item}: {item: any}) => {


  return (
    <article className={styles.product}>
            <Image
            className={styles.mainImg}
            src={item.imgUrl}
              height={2000}
              width={2000}
              alt="product"
            />
            <div className={styles.content}>
              <h1 className={styles.name}>{item.name}</h1>
              <h3 className={styles.price}>${item.price}</h3>
              <p className={styles.desc}>{item.desc}</p>
              <Image
              className={styles.bookmark}
              src={"/images/icons/bookmark.png"}
                width={50}
                height={50}
                alt="bookmard"
              />
              <Link href={`/products/${item.id}`}>
              <button>Buy Now</button>
              </Link>
            </div>
          </article>
  )
}

export default product