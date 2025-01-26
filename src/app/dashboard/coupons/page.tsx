"use client"
import React, { useEffect, useState } from 'react'
import styles from "./coupons.module.css"
import { createCouponServer, deleteCouponServer, getAllCouponsServer } from '@/server/order';
import Image from 'next/image';

const page = () => {
  const [coupons, setCoupons] = useState<any>();
  const [code, setCode] = useState("");
  const [percentage, setPercentage] = useState(0);

  const getCoupons = async() =>{
    const res = await getAllCouponsServer();
    setCoupons(res);
  }

  const deleteCoupon = async(id: string) =>{
    await deleteCouponServer(id);
    await getCoupons();
  }

  const createCoupon = async(e: any) =>{
    e.preventDefault();
    if(code && percentage){
      await createCouponServer(code, percentage);
      await getCoupons();
    }
  }

  useEffect(()=>{
    getCoupons();
  }, [])

  
  return (
    <section className={styles.coupons}>
      <h1 className={styles.title}>Coupons</h1>
      <form onSubmit={createCoupon}>
        <input value={code} onChange={(e: any) => setCode(e.target.value)} placeholder='Code' type="text" />
        <input value={percentage} onChange={(e: any)=> setPercentage(Number(e.target.value))} placeholder='Percentage' type="number" />

        <button>Create</button>
      </form>

      <article className={styles.table}>
        <div>
          <h3>Code: </h3>
          <h3>Percentage: </h3>
          <h3>Uses: </h3>
          <h3>Delete</h3>
        </div>
        {
          coupons?.map((coupon: any)=>{
            return <div key={coupon.id}>
              <h3>{coupon.code}</h3>
              <h3>{(coupon.percentage * 100)}%</h3>
              <h3>{coupon.uses}</h3>
              <h3>
                <Image
                src={"/images/icons/delete.png"}
                width={30}
                height={30}
                alt='delete'
                onClick={()=>deleteCoupon(coupon.id)}
                />
              </h3>
            </div>
          })
        }
      </article>
    </section>
  )
}

export default page