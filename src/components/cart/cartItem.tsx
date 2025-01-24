import React from 'react'
import styles from "./cart.module.css";
import Image from 'next/image';

const cartItem = () => {
  return (
          <div className={styles.cartItem}>
            <Image
            className={styles.itemImg} 
            src={"/images/main/bg1.jpg"}
              height={1000}
              width={1000}
              alt='product'
            />
            <h3 className={styles.itemName}>Name</h3>
            <h1 className={styles.itemPrice}>$50</h1>
            <div className={styles.change}>
              <Image
              src={"/images/icons/up.png"}
              height={30}
              width={30}
              alt='increase'
              />
              <span>3</span>
              <Image
              src={"/images/icons/down.png"}
              height={30}
              width={30}
              alt='decrease'
              />
            </div>
            <Image
            className={styles.delete}
              src={"/images/icons/delete.png"}
              height={30}
              width={30}
              alt='delete'
              />
          </div>
  )
}

export default cartItem