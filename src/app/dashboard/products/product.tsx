"use client"
import React, { useContext, useState } from 'react'
import styles from "./products.module.css"
import Link from 'next/link'
import Image from 'next/image'
import { changeProductStockServer, deleteProductServer } from '@/server/product'
import { ProductContext } from '@/context/product'

const product = ({product}: {product: any}) => {
    const [change, setChange] = useState(false);
    const [stock, setStock] = useState(0);
    const {getProducts}: any = useContext(ProductContext);

    const changeStock = async() =>{
        if(stock) {
            await changeProductStockServer(product.id, Number(stock));
            await getProducts();
        }
    }

    const deleteProduct = async() =>{
        await deleteProductServer(product.id);
        await getProducts();
    }

  return (
    <article>
        <h3>{product.name}</h3>
        <h3>{product.price}</h3>
        <h3>
            {
                !change ? product.stock : <input value={stock} onChange={(e: any)=> setStock(e.target.value)} type="number" />
            }
        </h3>
        <h3><Link href={`/products/${product.id}`}>page</Link></h3>
        <h3>
            <Image
            onClick={()=> deleteProduct()}
            src={"/images/icons/delete.png"}
            height={30}
            width={30}
            alt='delete'
            />
        </h3>
        <h3>
            {
                !change ? <button onClick={()=> setChange(true)}>Change</button> : <button onClick={()=> {
                    changeStock();
                    setChange(false);
                }}>Apply</button>
            }
        </h3>
      </article>
  )
}

export default product