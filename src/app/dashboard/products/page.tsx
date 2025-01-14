"use client"
import React, { useEffect, useState } from 'react'
import styles from "./products.module.css"
import Navbar from '../../../components/navbar/navbar'
import Footer from '../../../components/footer/footer'
import AdminNav from '../../../components/adminDashboard/admin'
import { createProductServer, getProductsServer } from '../../../utils/products'
import Product from './item'
import { getCategoriesServer } from '../../../utils/categories'


const page = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    stock: 0,
    categoryId: 1,
    price: 0,
    imageUrl: ""
  })

  const getProducts = async()=>{
    let res = await getProductsServer();
    setProducts(res);
    let cat = await getCategoriesServer();
    setCategories(cat);
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput: any = 
    Array.from(form.elements)
    .find(({name}: {name: any}) => name === 'file');
    
    const formData = new FormData();
    
    for(const file of fileInput.files) {
      formData.append('file', file);
    }
    
    formData.append('upload_preset', 'images');
    
    const data = await fetch(
    "https://api.cloudinary.com/v1_1/dyt5nloyw/upload"
    , {
      method: 'POST',
      body: formData
    }).then(r => r.json())
    await createProductServer({...productInfo, imageUrl: data.secure_url});
    await getProducts();
  }

  useEffect(()=>{
    getProducts();
  }, [])

  return (
    <>
    <Navbar />
    <AdminNav />
      <section className={styles.products}>
        <h1 className={styles.title}>Products</h1>
        <form onSubmit={handleSubmit} className={styles.form} action="">
          <label htmlFor="file">Image</label>
          <input   className={styles.file} type="file" name="file" id='file' placeholder='Image'/>
          <input onChange={(e)=>{
            setProductInfo({...productInfo, name: e.target.value})
          }} placeholder='Name...' type="text" />
          <input onChange={(e)=>{
            setProductInfo({...productInfo, description: e.target.value})
          }} placeholder='Description' type="text" />
          <input onChange={(e)=>{
            setProductInfo({...productInfo, price: Number(e.target.value)})
          }} placeholder='Price...' type="text" name="" id="" />
          <input onChange={(e)=>{
            setProductInfo({...productInfo, stock: Number(e.target.value)})
          }} placeholder='Stock...' type="text" name="" id="" />
          <select onChange={(e)=>{
                  setProductInfo({...productInfo, categoryId: Number(e.target.value)})
                }} name="" id="">
            {
              categories?.map((item: any)=>{
                return <option  key={item.id} value={`${item.id}`}>{item.name}</option>
              })
            }
          </select>
          <button>Create</button>
        </form>

        <div className={styles.productsGrid}>
            <article>
              <div>
                <h2>Name</h2>
              </div>
              <div>
                <h2>Price</h2>
              </div>
              <div>
                <h2>Stock</h2>
              </div>
              <div>
                <h2>Page</h2>
              </div>
              <div>
                <h2>Cat Id</h2>
              </div>
              <div>
                <h2>Update</h2>
              </div>
              <div>
                <h2>Delete</h2>
              </div>
            </article>
            {
              products.map((product: any) =>{
                return <Product key={product.id} getProducts={getProducts} product={product} />
              })
            }
        </div>
      </section>
    <Footer />
    </>
  )
}

export default page