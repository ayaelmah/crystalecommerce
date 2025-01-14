"use server"
import prisma from "../db";


export const getProductsIds = async(ids: number[]) => {
    const products = await prisma.product.findMany({
        where:{
            id: {
                in: ids
            }
        }
    });

    return products;
}

export const deleteCartItemServer = async(itemId: number, cartId: number) =>{
    const item = await prisma.cartItem.delete({
        where:{
            id: itemId,
            cartId: cartId
        }
    })

    return item;
}

export const getItemStock = async(productId: number) =>{
    const item = await prisma.product.findFirst({
        where:{
            id: productId
        }
    });

    return item.stock;
}

export const updateCartItemServer = async(quantity, itemId, cartId) =>{
    const updateItem = await prisma.cartItem.update({
        where:{
            id: itemId,
            cartId
        },
        data:{
            quantity: quantity,
        }
    })

    return updateItem;
}

export const addCartItemServer = async(productId: number, price: number, imgUrl: string, stock: number, name: string, cartId: number, quantity=1) =>{
    const newItem = await prisma.cartItem.create({
        data:{
            quantity: quantity,
            productId: productId,
            cartId,
            price: price,
            imgUrl: imgUrl,
            stock: stock,
            name: name
        }
    })

    return newItem;
}

export const getCartItemsServer = async(cartId: number) =>{
    const items = await prisma.cartItem.findMany({
        where:{
            cartId
        }
    })

    return items;
}