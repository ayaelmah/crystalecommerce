"use content"
import React, { useContext, useEffect, useState } from 'react'
import styles from "./item.module.css"
import Image from 'next/image'
import { CartContext } from '../../utils/cartContext'
import { deleteCartItemServer, updateCartItemServer } from '../../utils/cart'

const item = ({item}) => {
  const {
    getCartPrice,
    cartItems,
    cart,
    getItems,
    setCartItems
  } = useContext(CartContext);
  const [disable, setDisable] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price * quantity);
  const [exist, setExist] = useState(true);
  const [img, setImg] = useState(item.imgUrl);

  const addItem = async() =>{
    setDisable(true);
    if(item.stock > quantity){
      let newCartItems = cartItems.map((cartItem: any)=>{
        if(cartItem.id == item.id) {
          const newItem = {...item, quantity: quantity + 1};
          return newItem;
        }
        return cartItem;
      })
      await updateCartItemServer(quantity + 1, item.id, cart.id);
      setQuantity((prev: any) => {
        return prev + 1;
      });
      setCartItems(newCartItems);
      await getItems();
      getCartPrice();
    }
    setDisable(false);
  }

  const minusItem = async() =>{
    setDisable(true);
    if(quantity > 1) {
      let newCartItems = cartItems.map((cartItem: any)=>{
        if(cartItem.id == item.id) {
          return {...cartItem, quantity: cartItem.quantity - 1}
        }
        else return cartItem;
      })
      await updateCartItemServer(quantity - 1, item.id, cart.id);
      setQuantity(quantity - 1);
      await getItems();
      getCartPrice();
    } else {
      await deleteItem();
    }
    setDisable(false);
  }  

  const deleteItem = async() =>{
    let newCartItems = cartItems.map((product: any)=>{
      if(product.id != item.id) {
        return product
      } else return null;
    }).filter((product:any) => product);
    await deleteCartItemServer(item.id, cart.id);
    await getCartPrice();
    setExist(false);
    await getItems();
  }

  const checkExist = async() =>{
    const cartItem = cartItems.filter((product: any) => product.id == item.id);
    console.log("does it exist : ", cartItem);
    if(cartItem != null){
      setExist(true);
    } else setExist(false);
  }

  useEffect(()=>{
    checkExist();
  }, [cartItems])

  useEffect(()=>{
    setPrice(quantity * item.price)
  }, [quantity])




  return (
    <>
    
    <div className={styles.cartItem + " " + `${exist ? "" : styles.remove}`}>
                    <Image
                    className={styles.productImg}
                    src={item.imgUrl || ""}
                    width={3000}
                    height={3000}
                    alt='img'
                    />
                    <h1>{item.name}</h1>
                    <h3 className={styles.price}>${price}</h3>
                    <div className={styles.itemBtns}>
                      {
                        disable ?                         <Image
                        width={20}
                        height={20}
                        alt='up'
                        src={"/up.png"}
                        aria-disabled={disable}
                       />: <Image
                         width={20}
                         height={20}
                         onClick={()=> addItem()}
                         alt='up'
                         src={"/up.png"}
                         aria-disabled={disable}
                        />
                      }
                        
                        <h3>{quantity}</h3>
                        {
                          disable? <Image
                          width={20}
                          height={20}
                          alt='down'
                          src={"/down.png"}
                          aria-disabled={disable}
                         /> : <Image
                         width={20}
                         height={20}
                         onClick={() => minusItem()}
                         alt='down'
                         src={"/down.png"}
                         aria-disabled={disable}
                        />
                        }
                        
                    </div>
                    <h5 className={styles.delete} onClick={()=> deleteItem()}>Delete</h5>
                </div>
    </>
  )
}

export default item