"use server"

import prisma from "../db"

export const getCommentsServer = async(productId: number) =>{
    const comments = await prisma.review.findMany({
        where:{
            productId
        }
    });

    return comments
}

export const createReviewServer = async(userId: number, productId: number, rating: number, comment: string) =>{
    const review = await prisma.review.create({
        data:{
            userId,
            productId,
            rating,
            comment
        }
    })

    return review
}