"use client"
import React from 'react'
import styles from "./users.module.css"
import Image from 'next/image'
import Link from 'next/link'
import { removeUserServer } from '../../../utils/user'

const item = ({user, getUsers}) => {

    const removeUser = async() =>{
        await removeUserServer(user.id);
        await getUsers();
    }

  return (
    <article className={styles.user}>
    <h3>{user.name}</h3>
    <h3><Link href={`/myorders/${user.id}`}>page</Link></h3>
    <h3>
        <Image
        onClick={()=> removeUser()}
         width={30}
         height={30}
         src={"/trash.png"}
         alt='delete'
        />
    </h3>
  </article>
  )
}

export default item