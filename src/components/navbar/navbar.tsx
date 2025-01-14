"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./navbar.module.css"
import Link from 'next/link'
import Image from 'next/image'
import Cart from '../cart/cart'
import { CartContext } from '../../utils/cartContext'
import { SignedIn,  UserButton, useUser } from '@clerk/nextjs'
import { getUserServer } from '../../utils/user'

const navbar = () => {
  const {
    getItems,
    setOpenCart,
    setUserDB,
    setCart,
    userDB
    } = useContext(CartContext);
  const [clerkUser, setClerkUser] = useState<any>({
    id: "",
    name: "",
    email: "",
    imgUrl: ""
  });
  const {user} = useUser();

  useEffect(()=>{

    setClerkUser({
      id: user?.id,
      name: user?.fullName,
      email: user?.primaryEmailAddress,
      imgUrl: user?.imageUrl
    })
    getUser();
  }, [user])

  const navCart = async() =>{
    await getItems();
    setOpenCart(true);
  }

  const getUser = async() =>{
    if (user && user?.id && user?.fullName && user?.primaryEmailAddress && user?.imageUrl){
      let res = await getUserServer(String(user.id), {
        name: String(user.fullName) ,
        email: String(user.primaryEmailAddress) ,
        imgUrl: String(user.imageUrl)
      });
      const isAdmin = user.publicMetadata?.isAdmin;
     setUserDB({...res.user, isAdmin});
     setCart(res.cart);
    }
  }



  return (
    <nav className={styles.navbar}>
      <Cart />
        <h1 className={styles.logo}>Logo</h1>
        <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
        </ul>
        <div className={styles.icons}>
          <SignedIn>
            <Image
            onClick={()=> navCart()}
            width={30}
            height={30}
            alt='cart'
            src="/cart.png"
            />
            <Link href="/favorites">            
            <Image
            width={30}
            height={30}
            alt='favorite'
            src="/favorite.png"
            />
            </Link>
            <Link href="/myorders">            
            <Image
            width={30}
            height={30}
            alt='profile'
            src="/profile.png"
            />
            </Link>
            {
              userDB?.isAdmin ? <Link href={"/dashboard/products"}>
              <Image
                width={30}
                height={30}
                alt='dashboard'
                src="/dashboard.png"
              /> </Link>: ""
            }
            
              <UserButton />
            </SignedIn>
        </div>
    </nav>
  )
}

export default navbar