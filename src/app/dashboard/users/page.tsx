"use client"
import React, { useEffect, useState } from 'react'
import styles from "./users.module.css"
import { getAllUsersServer } from '@/server/user';
import Link from 'next/link';
import Image from 'next/image';

const page = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () =>{
    const res: any = await getAllUsersServer();
    setUsers(res);
  }

  useEffect(()=>{
    getUsers();
  }, [])
  return (
    <section className={styles.users}>
      <h1 className={styles.title}>Users</h1>
      <div className={styles.table}>
        <article>
          <h3>Name</h3>
          <h3>Orders</h3>
          <h3>Delete</h3>
        </article>
        {
          users.map((user: any)=>{
            return <article key={user.id}>
              <h3>{user.name}</h3>
              <h3>
                <Link href={`/profile/${user.id}`}>
                orders
                </Link>
              </h3>
              <h3>
                <Image
                src={"/images/icons/delete.png"}
                width={30}
                height={30}
                alt='delete'
                />
              </h3>
            </article>
          })
        }
      </div>
    </section>
  )
}

export default page