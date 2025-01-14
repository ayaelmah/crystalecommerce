"use server"

import prisma from "../db"

export const getCategoryIdServer = async(id: number)=>{
    let category = await prisma.category.findFirst({
        where:{
            id
        }
    })
    return category;
}

export const getCategoriesServer = async() =>{
    const res = await prisma.category.findMany({});
    return res;
}

export const createCategoriesServer = async(name: string) =>{
    const res = await prisma.category.create({
        data:{
            name
        }
    });

    return res;
}

export const removeCategoriesServer = async(id: number) =>{
    const res = await prisma.category.delete({
        where:{
            id
        }
    });

    return res;
}