"use server"

import { prisma } from "@/db"

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