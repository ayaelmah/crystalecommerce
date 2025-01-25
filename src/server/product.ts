"use server"

import { prisma } from "@/db"


export const getProductIdServer = async(id: string) =>{
    const product = await prisma.product.findFirst({
        where:{
            id
        }
    });

    return product;
}

export const getProductsServer = async() =>{
    const products = await prisma.product.findMany({});
    return products;
}

export const getFeaturedProductsServer = async() =>{
    const products = await prisma.product.findMany({
        where:{
            featured: true
        }
    });

    return products;
}

export const getCategoriesServer = async() =>{
    const categories = await prisma.category.findMany({});
    return categories;
}