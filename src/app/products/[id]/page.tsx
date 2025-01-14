"use client"
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../../components/navbar/navbar'
import Footer from '../../../components/footer/footer'
import styles from "./product.module.css"
import { CartContext } from '../../../utils/cartContext'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Category, Product } from '@prisma/client'
import { getProductIdServer } from '../../../utils/products'
import { addCartItemServer } from '../../../utils/cart'
import { createFavoritesServer, removeFavoritesServer } from '../../../utils/favourite'
import { createReviewServer, getCommentsServer } from '../../../utils/comment'
import { getCategoryIdServer } from '../../../utils/categories'

const page = () => {

  const [inCart, setInCart] = useState(false);
  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
    createdAt: "" as unknown as Date,
    updatedAt: "" as unknown as Date
  });
  const [productReviews, setProductReviews] = useState(0);
  const [inFavorite, setInFavorite] = useState(false);
  const [selectRating, setSelectRating] = useState("");
  const [selectComment, setSelectComment] = useState("");
  const [comments, setComments] = useState([]);
  const [hasCommented, setHasCommented] = useState(false);
  const {setOpenCart, cartItems, getItems, favorites, getFavorites, userDB, cart} = useContext(CartContext);
  const {id} = useParams();
  const [product, setProduct] = useState<any>({
     name: "",
     id: 0, 
     description: "",
     stock: 0,
     categoryId: 0,
     imageUrl: "",
     featured: false, 
     price: 0,
     createdAt: "2020-05-08"
  });

  // Category
  const getCategory = async() =>{
    const res = await getCategoryIdServer(product.categoryId);
    setCategory(res);
  }

  // Comments
  const getComments = async() =>{
    setHasCommented(false);
    let res = await getCommentsServer(product.id);
    res.forEach((comment: any) =>{
      if (comment.userId == userDB.id){
        setHasCommented(true);
      }
    })
    let reviews = res.map((item: any) => Number(item.rating));
    let total = reviews.reduce((sum: number, rating: number) => sum + rating, 0); 
    let averageRating = Math.round(total / reviews.length) || 0;
    setProductReviews(averageRating);
    setComments(res);
  }


  // Favorites
  const addFavorite = async() =>{
    setInFavorite(true);
    await createFavoritesServer(userDB.id, product.id);
    await getFavorites();
  }

  const removeFavorite = async() =>{
    setInFavorite(false);
    await removeFavoritesServer(userDB.id, product.id);
    await getFavorites();
  }

  const checkFavorite = async() =>{
    const analyze: any = favorites.find((favItem: any) => favItem.productId == product.id);
    if(analyze && analyze.id > 0) {
      setInFavorite(true)
    } else setInFavorite(false);
  }

  // Adding product
  const addProduct = async() =>{
    await addCartItemServer(product.id, product.price, product.imageUrl, product.stock, product.name, cart.id);
    await getItems();
    setOpenCart(true);
    await checkCart();
  }


  // Checking Cart
  const checkCart = async() =>{
    const analyze: any = cartItems.find((cartItem: any) => cartItem.productId == product.id);
    if(analyze && analyze.id > 0) {
      setInCart(true)
    } else setInCart(false);
  }

  const loadPage = async() => {
    await getItems();
    await checkCart();
    await checkFavorite();
  }

  const findProduct = async() =>{
        const res = await getProductIdServer(Number(id));
        setProduct(res);
    }

    const checkEvery = async() =>{
      await loadPage();
      await checkCart();
      await getFavorites();
      await checkFavorite();
      await getComments();
      await getCategory();
    }
    const addReview = async(e) =>{
      e.preventDefault();
      let res: any = await createReviewServer(userDB.id, product.id, Number(selectRating), selectComment );

      await getComments();
    }

    useEffect(()=>{
      checkEvery();
    }, [product])

 useEffect(()=>{
    findProduct();
 }, [userDB])

 useEffect(()=>{
    checkCart();
 }, [cartItems])

 useEffect(()=>{
  checkFavorite();
 }, [favorites])

  return (
    <>
    <Navbar />
    <section className={styles.product}>
        <Image className={styles.mainImg}
        height={3000}
        width={3000}
        alt="image"
        src={product?.imageUrl || "https://www.shutterstock.com/image-vector/no-item-found-vector-outline-260nw-2082716986.jpg"}
        />
        <div className={styles.content}>
            <h1>{product.name}</h1>
            <h2>${product.price}</h2>
            <h2>Category: {category?.name}</h2>
            <h4>
                {product.stock} left
            </h4>
            <h3>Rating: {productReviews}</h3>
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
            <button className={`${inCart? styles.inCart : " "}` + " " + styles.btn} disabled={inCart} onClick={()=> addProduct()} >Add To Cart</button>
        </div>
    </section>
    <br />
    <hr />
    <br />
    <br />
    <section className={styles.reviews}>
      <form onSubmit={addReview} action="">
        <select value={selectRating} onChange={(e) => setSelectRating(e.target.value)} name="" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <textarea onChange={(e)=>setSelectComment(e.target.value)} value={selectComment} name="" id="" placeholder='Your Opinion...'></textarea>
      <button className={`${hasCommented ? styles.commented : ""}`} disabled={hasCommented}>Submit</button>
      </form>
      <br />
      <br />
      <hr />
      <article className={styles.comments}>
        {
          comments.map((comment: any) =>{
            return <div key={comment.id} className={styles.review}>
          <h3>{comment.rating}</h3>
          <p>{comment.comment}</p>
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