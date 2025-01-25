"use server"

import { prisma } from "@/db"

const createCartServer = async() =>{
    const cart = await prisma.cart.create({
        data:{
            userId: "1"
        }   
    })

    return cart;
}

const getCartServer = async() =>{
    const cart = await prisma.cart.findFirst({
        where:{
            userId: "1"
        }
    });

    return cart;
};