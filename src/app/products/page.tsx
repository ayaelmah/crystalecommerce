import React from 'react'
import styles from "./products.module.css"
import Product from '@/components/product/product'
import Image from 'next/image'

const page = () => {
  return (
    <section className={styles.products}>
        <h1 className={styles.title}>Products</h1>
        <div className={styles.productFlex}>
            <article className={styles.productsFilter}>
                <h2>Filter</h2>
                <select name="" id="">
                    <option value="">category1</option>
                </select>
                <div className={styles.minmax}>
                    <div>
                        <h3>Min Price: </h3>
                        <input type="text" />
                    </div>
                    <div>
                        <h3>Max Price: </h3>
                        <input type="text" />
                    </div>
                    <div>
                        <h3>Max Width: </h3>
                        <input type="text" />
                    </div>
                    <div>
                        <h3>Max Height: </h3>
                        <input type="text" />
                    </div>
                    <button>Select</button>
                </div>
            </article>
            <section className={styles.productsGrid}>
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </section>
        </div>
        <div className={styles.change}>
            <Image
            src={"/images/icons/left.png"}
            width={50}
            height={50}
            alt="left"
            />
            <Image
            src={"/images/icons/right.png"}
            width={50}
            height={50}
            alt="right"
            />
        </div>
    </section>
  )
}

export default page