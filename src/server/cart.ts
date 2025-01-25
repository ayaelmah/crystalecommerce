"use server"

import { prisma } from "@/db"

export const addCartItemServer = async(cartId: string, id: string, name: string, imgUrl: string, quantity: number, price: number) =>{
    const cartItem = await prisma.cartItem.create({
        data:{
            productId: id,
            cartId,
            name: name,
            quantity: quantity,
            price: price,
            imgUrl: imgUrl
        }
    });

    return cartItem;
}

export const getCartItemsServer = async(cartId: string) =>{
    const cartItems = await prisma.cartItem.findMany({
        where:{
            cartId
        }
    });

    return cartItems;
}