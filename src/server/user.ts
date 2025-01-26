"use server";

import { prisma } from "@/db";

export const getAllUsersServer = async() =>{
    const res = await prisma.user.findMany({});

    return res;
}

export const createUserServer = async(name: string, email: string, clerkId: string) =>{
    let user = await prisma.user.findFirst({
        where:{
            clerkId
        }
    });

    if (user && user.id){
        user = await prisma.user.update({
            where:{
                id: user.id        
            },
            data:{
                clerkId,
                name,
                email
            }
        });
    } else {
        user = await prisma.user.create({
            data:{
                clerkId,
                name,
                email
            }
        });
    }

    let cart = await prisma.cart.findFirst({
        where: {
            userId: user.id
        }
    });

    if(!cart || !cart.id){
        cart = await prisma.cart.create({
            data:{
                userId: user.id
            }
        });
    }

    return {cart: cart, user: user};
}

export const getBookMarksServer = async(userId: string) =>{
    const items = await prisma.bookMark.findMany({
        where:{
            userId: userId
        }
    });
    return items;
}

export const addBookMarkServer = async(userId: string, productId: string) =>{
    const item = await prisma.bookMark.create({
        data:{
            userId,
            productId
        }
    })
}

export const removeBookMarkServer = async(userId: string, productId: string) =>{
    const item = await prisma.bookMark.delete({
        where:{
            userId,
            productId
        }
    });
    return item;
}