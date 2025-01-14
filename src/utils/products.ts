"use server"

import prisma from "../db"


export const createProductServer = async({name, description, price, stock, categoryId, imageUrl}: {name: string, description: string, price: number, stock: number, categoryId: number, imageUrl: string}) =>{
    console.log("category Id :", categoryId);
    const product = await prisma.product.create({
        data:{
            name,
            stock,
            price,
            description,
            imageUrl,
            categoryId
        }
    })
    return product
}

export const removeProductServer = async(id: number) =>{
    const product = await prisma.product.delete({
        where:{
            id
        }
    });
    return product;
}

export const changeStockServer = async(id: number, stock: number) =>{
    const product = await prisma.product.update({
        where:{
            id
        }, 
        data:{
            stock
        }
    });

    return product;
}

export const getProductsServer = async() =>{
    const products = await prisma.product.findMany({});

    return products;
}

export const getFeaturedMain = async() =>{
    const items = await prisma.product.findMany({
        where:{
            featured: true
        }
    });

    return items;
}

export const getProductIdServer = async(productId: number) =>{
    let res = await prisma.product.findFirst({
        where: {
            id: productId
        }
    })
    return res;
}

const getPopularMain = async() =>{

}