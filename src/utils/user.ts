"use server"


import prisma from "../db";


interface UserInfo {
    name: string;
    email: string | any;
    imgUrl: string;
}

export const removeUserServer = async(id: number) =>{
    const user = await prisma.user.delete({
        where:{
            id
        }
    });

    return user;
}

export const getAllUsersServer = async() =>{
    const users = await prisma.user.findMany({});

    return users;
}

export const getUserServer = async(clerkId: string, userInfo: UserInfo) =>{
    let user = await prisma.user.findFirst({
        where:{
            clerkId
        }
    })
    let cart = await prisma.cart.findFirst({
        where:{
            userId: user?.id
        }
    })
    if (user && user.id){
        user = await prisma.user.update({
            where:{
                id: user.id
            },
            data:{
                email: userInfo.email,
                name: userInfo.name,
                imgUrl: userInfo.imgUrl
            }
        });
    } else {
        user = await prisma.user.create({
            data:{
                clerkId: clerkId,
                email: userInfo.email,
                name: userInfo.name,
                imgUrl: userInfo.imgUrl
            }
        })
        cart = await prisma.cart.create({
            data:{
                userId: user.id
            }
        })

    }

    return {user: user, cart: cart};
}

