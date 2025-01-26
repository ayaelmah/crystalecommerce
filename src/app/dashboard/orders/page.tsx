"use client"
import React, { useEffect, useState } from 'react'
import styles from "./orders.module.css"
import Order from './order'
import { getAllOrdersServer } from '@/server/order'

const page = () => {
  const [orders, setOrders] = useState([]);


  const getOrders = async() =>{
    const res: any = await getAllOrdersServer();
    setOrders(res);
  }

  useEffect(()=>{
    getOrders();
  }, [])

  return (
    <section className={styles.orders}>
      <h1 className={styles.title}>Orders</h1>
      <div className={styles.table}>
        <article>
          <h3>Name</h3>
          <h3>Total Amount</h3>
          <h3>
            Status
          </h3>
            <h3>Change</h3>
        </article>
        {
          orders?.map((order :any) =>{
            return <Order key={order.id} getOrders={getOrders} item={order} />
          })
        }
      </div>
    </section>
  )
}

export default page