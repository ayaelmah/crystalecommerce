"use server"

import { prisma } from "@/db"

// Products

export const createProductServer = async(name: string, description: string, imgUrl: string,
    price: number, stock: number, height: number, width: number) =>{
    const product = await prisma.product.create({
        data:{
            name,
            description,
            stock,
            height,
            width,
            imgUrl,
            price
        }
    });
}

export const changeProductStockServer = async(id: string, stock: number) =>{
    const product = await prisma.product.update({
        where:{
            id
        },
        data:{
            stock
        }
    });
}

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

export const deleteProductServer = async(id: string) =>{
    const product = await prisma.product.delete({
        where:{
            id
        }
    });
}

// Categories

export const getCategoriesServer = async() =>{
    const categories = await prisma.category.findMany({});
    return categories;
}

export const createCategoryServer = async(name: string) =>{
    const category = await prisma.category.create({
        data:{
            name
        }
    });

    return category
}

export const deleteCategoryServer = async(id: string) =>{
    const category = await prisma.category.delete({
        where:{
            id
        }
    })
}