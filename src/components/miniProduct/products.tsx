"use content"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from "./product.module.css"
import { CartContext } from '../../utils/cartContext'
import { addCartItemServer } from '../../utils/cart'
import { createFavoritesServer, removeFavoritesServer } from '../../utils/favourite'
import Link from 'next/link'
import { Category } from '@prisma/client'
import { getCategoryIdServer } from '../../utils/categories'

const products = ({item}) => {

  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
    createdAt: "" as unknown as Date,
    updatedAt: "" as unknown as Date
  })
  const [inCart, setInCart] = useState(false);
  const [inFavorite, setInFavorite] = useState(false);
  const {setOpenCart, cartItems, getItems, favorites, getFavorites, userDB, cart} = useContext(CartContext);

  // Category
  const getCategory = async() =>{
    const res = await getCategoryIdServer(item.categoryId);
    setCategory(res);
  }

  // Favorites
  const addFavorite = async() =>{
    setInFavorite(true);
    await createFavoritesServer(userDB.id, item.id);
    await getFavorites();
  }

  const removeFavorite = async() =>{
    setInFavorite(false);
    await removeFavoritesServer(userDB.id, item.id);
    await getFavorites();
  }

  const checkFavorite = async() =>{
    const analyze: any = favorites.find((favItem: any) => favItem.productId == item.id);
    if(analyze && analyze.id > 0) {
      setInFavorite(true)
    } else setInFavorite(false);
  }

  // Products
  const addProduct = async() =>{
    await addCartItemServer(item.id, item.price, item.imageUrl, item.stock, item.name, cart.id);
    await getItems();
    setOpenCart(true);
    await checkCart();
  }

  // Cart
  const checkCart = async() =>{
    const analyze: any = cartItems.find((cartItem: any) => cartItem.productId == item.id);
    if(analyze && analyze.id > 0) {
      setInCart(true)
    } else setInCart(false);
  }

  const loadPage = async() => {
    await getItems();
    await checkCart();
    await checkFavorite();
    await getCategory();
  }

  useEffect(()=>{
    loadPage();
  }, [])

  useEffect(()=>{
    checkCart();
  }, [cartItems]);


  return (
    <>
    
    <div className={styles.product}>
      <Link href={`/products/${item.id}`}>
      <Image
      className={styles.productImg}
      width={300}
      height={200}
      alt='product'
      src={item.imageUrl || "/notFound.jpg"}
      />
      </Link>
    <div className={styles.content}>
    <h3>{item.name}</h3>
    <h4 className={styles.price}>${item.price}</h4>
    <h5>{category?.name}</h5>
    <p>{item.description}</p>
    </div>
    <div className={styles.favorites}>
      {
        inFavorite ? <Image
        onClick={()=> removeFavorite()}
        width={30}
        height={30}
        alt="selected"
        src={"/redfavorite.png"} /> :<Image
    className={styles.whiteHeart}
    onClick={()=> addFavorite()}
    width={30}
    height={30}
    alt="select"
    src={"/favorite.png"} />
      }
    
        
    </div>
    <button className={`${inCart? styles.inCart : " "}` + " " + styles.btn} disabled={inCart} onClick={()=> addProduct()}>Buy Now</button>
</div>
    </>
  )
}

export default products