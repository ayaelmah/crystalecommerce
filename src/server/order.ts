"use server"

import { prisma } from "@/db"
import { CartItem } from "@prisma/client";

export const getCouponPecServer = async(code: string) =>{
    const coupon = await prisma.coupon.findFirst({
        where:{
            code
        }
    });

    return coupon?.percentage;
}

export const createOrderServer = async(userId: string, name: string, email: string, phone: string, address: string, total: number, cartItems: CartItem[]) => {
    const order = await prisma.order.create({
        data:{
            name,
            email,
            address,
            phone,
            total,
            userId
        }
    });

    if(order && order.id){
        cartItems.forEach(async (item: any)=>{
            await createOrderItemServer(item, order.id);
        })
    }
}

export const createOrderItemServer = async(item: CartItem, orderId: string) =>{
    const product = await prisma.orderItem.create({
        data:{
            name: item.name,
            orderId,
            productId: item.id,
            quantity: item.quantity,
            price: item.price
        }
    });
}