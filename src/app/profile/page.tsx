import React from 'react'
import styles from "./profile.module.css"

const page = () => {
  return (
    <section className={styles.myorders}>
        <h1 className={styles.title}>Profile Info </h1>
        <div className={styles.table}>
            <article>
                <h3>Order Id: </h3>
                <h3>Total: </h3>
                <h3>Status: </h3>
                <h3>Info</h3>
            </article>
            <article>
                <h3>Order Id: </h3>
                <h3>Total: </h3>
                <h3>Info</h3>
            </article>
            <article>
                <h3>Order Id: </h3>
                <h3>Total: </h3>
                <h3>Info</h3>
            </article>
        </div>
    </section>
  )
}

export default page