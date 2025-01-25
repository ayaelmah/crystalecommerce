import React from 'react'
import styles from "./bookmark.module.css"
import Product from '@/components/product/product'

const bookmark = () => {
  return (
    <section className={styles.bookmark}>
      <h1 className={styles.title}>Bookmarks</h1>
      <div className={styles.bookmarkGrid}>
        <Product />
        <Product />
        <Product />
      </div>
    </section>
  )
}

export default bookmark