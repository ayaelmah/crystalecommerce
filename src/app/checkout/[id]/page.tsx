"use client"
import React, {useRef, useEffect, useState} from 'react'
import styles from "./order.module.css";
import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from 'next/navigation';
import { getOrderItemsServer } from '../../../utils/order';

const page = () => {
    const pdfRef = useRef(null);
    const [data, setData] = useState<any>({});

    const { id } = useParams<{ id: string }>();

    const getOrderItems = async () => {
      if (id && !isNaN(Number(id))) {
        let res: any = await getOrderItemsServer(Number(id));
        setData(res);
        console.log(Number(id), res);
      } else {
        console.error("Invalid or missing ID");
      }
    };

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

    useEffect(()=>{
        getOrderItems();

    }, [])
  return (
    <>
    <Navbar />
        <section ref={pdfRef} className={styles.order}>
            <article>
                <div className={styles.flex}>
                    <h3>Order Id: {data?.order?.id} </h3>
                </div>
                <div className={styles.flex}>
                    <h3>FullName: {data?.order?.fullName} </h3>
                    <h3>Email: {data?.order?.email} </h3>
                </div>
                <div className={styles.flex}>
                    <h3>Phone Number: {data?.order?.phone} </h3>
                    <h3>Street: {data?.order?.street} </h3>
                </div>
            </article>
            <article className={styles.productGrid}>
                <div>
                    <h3>Product Id</h3>
                    <h3>Price</h3>
                    <h3>Quantity</h3>
                </div>
                {
                    data?.items?.map((item: any) =>{
                        return <div key={item.id}>                     <h3>{item?.id}</h3>
                    <h3>{item?.price}</h3>
                    <h3>{item?.quantity}</h3>
                        </div>
                    })
                }
            </article>
            <article className={styles.total}>
                <h1>Total: {data?.order?.totalAmount}</h1>
            </article>
        </section>
        <article>
            <button onClick={()=> generatePDF()} className={styles.download}>Download</button>
        </article>
    <Footer />
    </>
  )
}

export default page