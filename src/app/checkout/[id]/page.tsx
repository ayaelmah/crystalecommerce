import React from 'react'
import styles from "./order.module.css"

const page = () => {
  return (
    <section className={styles.order}>
        <article className={styles.orderInfo}>
        <h1>Order</h1>
        <h1>Name: </h1>
        <h1>Address: </h1>
        <div className={styles.pdfTable}>
            <div>
                <h3>Product Name</h3>
                <h3>Price</h3>
                <h3>Quantity</h3>
            </div>
        </div>
        <h1 className={styles.total}>Total: $52</h1>
        </article>
        <button>Download PDF</button>
    </section>
  )
}

export default page