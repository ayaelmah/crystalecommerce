"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./products.module.css"
import Product from './product'
import { ProductContext } from '@/context/product'
import { createProductServer } from '@/server/product'

const page = () => {
  const {products, getProducts, categories}: any = useContext(ProductContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [category, setCategory] = useState("");


  const handleSubmit = async(e: any) =>{
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput: any = 
    Array.from(form.elements)
    .find(({name}: any) => name === 'file');
    
    const formData = new FormData();
    
    for(const file of fileInput.files) {
      formData.append('file', file);
    }
    
    formData.append('upload_preset', 'gcpqrtfn');
    
    const data = await fetch(
    "https://api.cloudinary.com/v1_1/dom0p8qft/upload"
    , {
      method: 'POST',
      body: formData
    }).then(r => r.json());
    if(name && description && data.secure_url && price && stock && height && width) {
      await createProductServer(name,description ,data.secure_url, Number(price), Number(stock), Number(height), Number(width), category);
      await getProducts();
    }
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setHeight("");
    setWidth("");
    setCategory("");
  }

  

  return (
  <section className={styles.products}>
    <h1 className={styles.title}>Products</h1>
    <form onSubmit={handleSubmit}>
      <input name="file"  type="file" />
      <div className={styles.threeFlex}>
      <input value={name} onChange={(e:any) => setName(e.target.value)} placeholder='Name...' type="text" />
      <input value={description} onChange={(e: any)=> setDescription(e.target.value)} placeholder='Description...' type="text" />
      <input value={price} onChange={(e: any)=> setPrice(e.target.value)} placeholder='Price' type="text" />
      </div>
      <div className={styles.threeFlex}>
      <input value={stock} onChange={(e: any)=> setStock(e.target.value)} placeholder='stock' type="text" />
      <input value={height} onChange={(e: any) => setHeight(e.target.value)} placeholder='Height' type="text" />
      <input 
      value={width} onChange={(e: any) => setWidth(e.target.value)} placeholder='Width' type="text" />
      </div>
      <select value={category} onChange={(e: any)=> setCategory(e.target.value)} id="">
        {
          categories.map((item: any)=>{
          return <option key={item.id} value={`${item.id}`}>{item.name}</option>
          })
        }
      </select>
      <button>Create</button>
    </form>

    <div className={styles.table}>
      <article>
        <h3>Name</h3>
        <h3>Price</h3>
        <h3>Stock</h3>
        <h3>Product Page</h3>
        <h3>Delete</h3>
        <h3>Change Stock</h3>
      </article>
      {
        products?.map((product: any)=>{
          return <Product key={product.id} product={product} />
        })
      }
    </div>
  </section>
  )
}

export default page