"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from "./order.module.css"
import { useParams } from 'next/navigation'
import { getOrderItemServer, getOrderServer } from '@/server/order'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const page = () => {
  const {id}: {id: string} = useParams();
  const [order, setOrder] = useState<any>();
  const [orderItem, setOrderItem] = useState<any>();
  const pdfRef = useRef(null);

  const generatePDF = async () => {
    try {
      if (!pdfRef.current) {
        console.error("Reference to the element not found!");
        return;
      }

      const canvas = await html2canvas(pdfRef.current, {
        scale: 2, 
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save("document.pdf");
    } catch (error) {
      console.error("Failed to generate PDF", error);
    }
  };

  const getOrder = async() =>{
    const res = await getOrderServer(id);
    if(res && res.id){
      const items = await getOrderItemServer(res.id);
      setOrderItem(items);
    }
    setOrder(res);
  }

  useEffect(()=>{
    getOrder();
  }, [])
  return (
    <section className={styles.order}>
        <article ref={pdfRef} className={styles.orderInfo}>
        <h1>Order</h1>
        <h1>Name: {order?.name}</h1>
        <h1>Address: {order?.address}</h1>
        <div className={styles.pdfTable}>
            <div>
                <h3>Product Name</h3>
                <h3>Price</h3>
                <h3>Quantity</h3>
            </div>
            {
              orderItem?.map((item: any)=>{
                return <div key={item.id}>
                <h3>{item.name}</h3>
                <h3>{item.price}</h3>
                <h3>{item.quantity}</h3>
            </div>
              })
            }
        </div>
        <h1 className={styles.total}>Total: ${order?.total}</h1>
        </article>
        <button onClick={()=> generatePDF()}>Download PDF</button>
    </section>
  )
}

export default page