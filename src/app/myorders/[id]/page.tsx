"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "../myorders.module.css"
import Navbar from '../../../components/navbar/navbar'
import Footer from '../../../components/footer/footer'
import { CartContext } from '../../../utils/cartContext'
import { getOrderItemsServer, getUserOrdersServer } from '../../../utils/order'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const page = () => {
    const {userDB} = useContext(CartContext)
    const [orders, setOrders] = useState<any>([]);
    const {id} = useParams();

    const findOrders = async() =>{
        if(userDB && userDB.id){
            let res = await getUserOrdersServer(Number(id));
            setOrders(res);
        }
    }

    useEffect(()=>{
        findOrders();
    }, [userDB])
  return (
    <>
    <Navbar />
    <section className={styles.myorders}>
        <h1 className={styles.title}>My Orders</h1>
        <article className={styles.orders}>
            <div>
                <h2>Order Id: </h2>
                <h2>Total Amount: </h2>
                <h2>View</h2>
                <h2>Status: </h2>
            </div>
            {
                orders?.map((item: any) =>{
                    return <div key={item.id}>
                    <h2>{item.id} </h2>
                    <h2>${item.totalAmount}</h2>
                    <h2><Link href={`/checkout/${item.id}`}>page</Link></h2>
                    <h2>{item.status}</h2>
                </div>
                })
            }
        </article>
    </section>
    <Footer />
    </>
  )
}

export default page