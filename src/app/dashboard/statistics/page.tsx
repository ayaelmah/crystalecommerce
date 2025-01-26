"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./statistics.module.css"
import { UserContext } from '@/context/user'
import { getAllOrdersServer } from '@/server/order'
import { getAllUsersServer } from '@/server/user'

const page = () => {

  const [orders, setOrders] = useState<any>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [users, setUsers] = useState<any>([]);

  const getOrders = async() =>{
    const res = await getAllOrdersServer();
    let total = 0;
    setOrders(res);
    res.forEach((item: any)=>{
      total += item.total;
    })
    setTotalAmount(total);
  }

  const getUsers = async() =>{
    const res = await  getAllUsersServer();
    setUsers(res);
  }

  useEffect(()=>{
    getOrders();
    getUsers();
  }, [])
  
  return (
    <section className={styles.statistic}>
      <h1 className={styles.title}>Statistics</h1>
      <div className={styles.info}>
        <article>
          <h2>Orders: </h2>
          <h3>{orders.length}</h3>
        </article>
        <article>
          <h2>Total: </h2>
          <h3>{totalAmount.toFixed(2)}</h3>
        </article>
        <article>
          <h2>Users: </h2>
          <h3>{users.length}</h3>
        </article>
      </div>
    </section>
  )
}

export default page