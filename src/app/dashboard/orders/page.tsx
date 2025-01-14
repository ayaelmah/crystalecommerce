"use client"
import React, { useEffect, useState } from 'react'
import styles from "./orders.module.css"
import Navbar from '../../../components/navbar/navbar'
import Footer from '../../../components/footer/footer'
import AdminNav from '../../../components/adminDashboard/admin'
import { getAllOrdersServer } from '../../../utils/order'
import Item from './item'

const page = () => {

  const [orders, setOrders] = useState([]);

  const getOrders = async() =>{
    const res = await getAllOrdersServer();
    setOrders(res);
  }

  useEffect(()=>{
    getOrders();
  }, [])

  return (
    <>
    <Navbar/>
    <AdminNav />
    <section className={styles.orders}>
      <h1 className={styles.title}>Orders</h1>

      <div className={styles.ordersGrid}>
      <article className={styles.order}>
    <div>
      <h2>Order Id</h2>
    </div>
    <div>
      <h2>Total Amount</h2>
    </div>
    <div>
      <h2>Receipt</h2>
    </div>
    <div>
      <h2>
      Status
      </h2>
    </div>
    <div>
      <h2>
    Change Status
      </h2>
    </div>
  </article>
        {
          orders.map((order: any) =>{
            return <Item key={order.id} order={order} getOrders={getOrders} />
          })
        }
      </div>
    </section>
    <Footer />
    </>
  )
}

export default page