"use client"
import React, { useState } from 'react'
import styles from "./products.module.css"
import Link from 'next/link'
import Image from 'next/image'
import { changeStockServer, removeProductServer } from '../../../utils/products'

const item = ({product, getProducts}) => {

    const [isSelected, setIsSelected] = useState(false);
    const [stock, setStock] = useState(0);

    const changeStock = async() =>{
        if(stock > 0){
            let res = await changeStockServer(product.id, stock);
            await getProducts();
        }
    }

    const removeProduct = async() =>{
        let res = await removeProductServer(product.id);
        await getProducts();
      }

  return (
    <article>
              <div>
                <h2>{product.name}</h2>
              </div>
              <div>
                <h2>${product.price}</h2>
              </div>
              <div>
                {
                    isSelected ? <input value={stock} onChange={(e)=> setStock(Number(e.target.value))} placeholder='stock' type="text" /> : <h2>{product.stock}</h2>
                }
                
              </div>
              <div>
                <h2>
                    <Link href={`/products/${product.id}`}>
                        page
                    </Link>
                </h2>
              </div>
              <div>
                <h2>
                  {product.categoryId}
                </h2>
              </div>
              <div>
                {
                    isSelected ? <button onClick={()=> {
                        changeStock();
                        setIsSelected(false)
                    }}>Update</button> : <button onClick={()=> setIsSelected(true)}>Change</button>
                }
              </div>
              <div>
                <Image
                onClick={()=> removeProduct()}
                src={"/trash.png"}
                height={30}
                width={30}
                alt='delete'
                />
              </div>
            </article>
  )
}

export default item