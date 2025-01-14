"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from "./orders.module.css";
import { changeOrderStatusServer } from '../../../utils/order';

const item = ({order, getOrders}) => {
    const [select, setSelect] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    const changeStatus = async() =>{
        let res = await changeOrderStatusServer(order.id, select);
        await getOrders();
    }

    return (
    <article className={styles.order}>
    <div>
      <h2>{order.id}</h2>
    </div>
    <div>
      <h2>{order.totalAmount}</h2>
    </div>
    <div>
      <h2><Link href={`/checkout/${order.id}`}>page</Link></h2>
    </div>
    <div>
        {
            isSelected ? <select value={select} onChange={(e)=> setSelect(e.target.value)} name="" id="">
        <option value="PENDING">PENDING</option>
        <option value="CANCELLED">CANCELLED</option>
        <option value="COMPLETED">COMPLETED</option>
      </select> : <h2>{order.status}</h2>
        }
      
    </div>
    <div>
        {
            isSelected ? <button onClick={()=>
                { 
                    changeStatus();
                    setIsSelected(false)
                }}>Edit</button> : <button onClick={()=> setIsSelected(true)}>Change</button>
        }
    </div>
  </article>
  )
}

export default item