"use server"

import { prisma } from "@/db"
import { CartItem } from "@prisma/client";

// all orders
export const getAllOrdersServer = async() =>{
    const orders = await prisma.order.findMany({});
    return orders;
}


// coupons

export const getAllCouponsServer = async() =>{
    const res = await prisma.coupon.findMany({});
    return res;
}

export const createCouponServer = async(code: string, percentage: number) =>{
    const res = await prisma.coupon.create({
        data:{
            code,
            percentage,
            uses: 0
        }
    });
}

export const deleteCouponServer = async(id: string) =>{
    const res = await prisma.coupon.delete({
        where:{
            id
        }
    });
}

export const getCouponPecServer = async(code: string) =>{
    const coupon = await prisma.coupon.findFirst({
        where:{
            code
        }
    });

    return coupon;
}

export const useCouponServer = async(code: string, uses: number) =>{
    const coupon = await prisma.coupon.update({
        where:{
            code
        },
        data:{
            uses
        }
    });

    return coupon;
}

// user Orders

export const getUserOrdersServer = async(userId: string) =>{
    const orders = await prisma.order.findMany({
        where:{
            userId
        }
    });

    return orders
}

export const getOrderServer = async(id: string) =>{
    const order = await prisma.order.findFirst({
        where:{
            id
        }
    });

    return order;
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

    cartItems.forEach(async (item: any)=>{
        await createOrderItemServer(item, order.id);
    })
    return order;
}

export const createOrderItemServer = async(item: CartItem, orderId: string) =>{
    const product = await prisma.orderItem.create({
        data:{
            name: item.name,
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }
    });
}

export const getOrderItemServer = async(orderId: string) =>{
    const items = await prisma.orderItem.findMany({
        where:{
            orderId
        }
    });

    return items;
}

export const changeOrderStatusServer = async(OrderId: string, status: string) =>{
    const order = await prisma.order.update({
        where:{
            id: OrderId
        },
        data: {
            status
        }
    });

    return order;
}