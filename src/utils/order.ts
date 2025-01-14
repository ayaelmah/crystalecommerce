"use server"

import item from "../components/cartItem/item";
import prisma from "../db"
import { redirect } from "next/navigation";


export const getAllOrdersServer = async() =>{
    const orders = await prisma.order.findMany({});
    return orders;
}

export const getUserOrdersServer = async(userId: number) =>{
    const order = await prisma.order.findMany({
        where:{
            userId
        }
    });

    return order;
}

export const changeOrderStatusServer = async(orderId: number, status: string) =>{
    const order = await prisma.order.update({
        where:{
            id: orderId
        },
        data:{
            status: status
        }
    });

    return order;
}

interface Item {
    fullname: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    zip: string;
    street: string;
}

export const createOrderServer = async(userId=0, totalAmount=0, status="PENDING", item: Item, cartItems: any) =>{
    const order = await prisma.order.create({
        data:{
            userId,
            totalAmount: totalAmount + 4,
            status, 
            fullName: item.fullname,
            email: item.email,
            phone: item.phone,
            Country: item.country,
            City: item.city,
            zip: item.zip,
            street: item.street
        }
    });

    for (const item of cartItems) {       
        await createOrderItemServer(item, order.id);
    }

    redirect(`/checkout/${order.id}`);
}

export const getOrderItemsServer = async(id: number) =>{ 
    const order = await prisma.order.findFirst({
        where:{
            id
        }
    });

    const items = await prisma.orderItem.findMany({
        where:{
            orderId: order?.id
        }
    });

    return {
        order: order,
        items
    }
}

export const createOrderItemServer = async(item: any, orderId: number) =>{
    const order = await prisma.orderItem.create({
        data:{
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }
    });

    console.log(order);
}

const deleterOrderServer = async(orderId: number) => {
    const order = await prisma.order.delete({
        where:{
            id: orderId
        }
    })
    return order;
}