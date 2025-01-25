"use server";

import { prisma } from "@/db";




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
