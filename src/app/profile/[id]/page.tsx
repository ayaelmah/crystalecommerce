"use client"
import React, {useState, useEffect, useContext} from 'react'
import styles from "../profile.module.css";
import Link from 'next/link';
import { UserContext } from '@/context/user';
import { getUserOrdersServer } from '@/server/order';
import { useParams } from 'next/navigation';

const page = () => {
    const [orders, setOrders] = useState<any>([]);
    const {user}: any = useContext(UserContext);
    const {id} : {id: string} = useParams();

    const getOrders = async() =>{
        const res: any = await getUserOrdersServer(id);
        setOrders(res);
    }

    useEffect(()=>{
        if(user && user.id){
            getOrders();
        }
    },[user])

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
            {
                orders?.map((order:any)=>{
                    return <article key={order.id}>
                    <h3>{order.id}</h3>
                    <h3>{order.total}</h3>
                    <h3>{order.status}</h3>
                    <h3><Link href={`/checkout/${order.id}`}>Order page</Link></h3>
                </article> 
                })
            }
        </div>
    </section>
  )
}

export default page