"use client"
import React, { useState } from 'react'
import styles from "./orders.module.css"
import { changeOrderStatusServer } from '@/server/order';

const order = ({item, getOrders}: {item: any, getOrders: any}) => {
    const [change, setChange] = useState(false);
    const [status, setStatus] = useState("");

    const changeStatus = async() =>{
        if(status) {
            await changeOrderStatusServer(item.id, status);
            await getOrders();
        }
    }


  return (
    <article >
          <h3>{item.name}</h3>
          <h3>{item.total}</h3>
          <h3>
            {
                !change ? item?.status : <select onChange={(e: any) => setStatus(e.target.value)} value={status} name="" id="">
                    <option value="PENDING"> Pending </option>
                    <option value="COMPLETED"> Completed </option>
                    <option value="CANCELLED"> Cancelled </option>
                </select>
            }
            </h3>
            <h3>
                {
                    !change ? <button onClick={()=> setChange(true)}>Change</button> : <button onClick={()=>{
                        changeStatus();
                        setChange(false)
                        }}>Apply</button>
                }
            </h3>
        </article>
  )
}

export default order