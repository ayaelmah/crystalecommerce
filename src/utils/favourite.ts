"use server"

import prisma from "../db"

export const getFavoritesServer = async(userId: number) =>{
    const items = await prisma.favorite.findMany({
        where: {
            userId
        }
    });

    return items
}

export const createFavoritesServer = async(userId: number, productId: number) =>{
    const item = await prisma.favorite.create({
        data:{
            userId,
            productId
        }
    });

    return item;
}


export const removeFavoritesServer = async(userId: number, productId: number) =>{
    const item = await prisma.favorite.delete({
        where:{
            productId
        }
    });

    return item;
}