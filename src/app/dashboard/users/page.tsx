"use client"
import React, { useEffect, useState } from 'react'
import styles from "./users.module.css"
import Navbar from '../../../components/navbar/navbar'
import Footer from '../../../components/footer/footer'
import AdminNav from '../../../components/adminDashboard/admin'
import { getAllUsersServer } from '../../../utils/user'
import Item from './item'

const page = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async() =>{
    let res = await getAllUsersServer();
    setUsers(res);
  }

  useEffect(()=>{
    getUsers();
  }, [])

  return (
    <>
      <Navbar />
      <AdminNav />
      <section className={styles.users}>
        <h1 className={styles.title}>
          Users
        </h1>
          <div className={styles.usersGrid}>
            <article className={styles.user}>
              <h3>UserName</h3>
              <h3>Orders</h3>
              <h3>Admin</h3>
            </article>
            {
              users?.map((user: any)=>{
                return <Item key={user.id} user={user} getUsers={getUsers} />
              })
            }
          </div>
      </section>
      <Footer />
    </>
  )
}

export default page