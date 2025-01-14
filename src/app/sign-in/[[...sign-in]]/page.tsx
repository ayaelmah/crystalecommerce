import React from 'react'
import { SignIn } from '@clerk/nextjs'
import Navbar from '../../../components/navbar/navbar'
import Footer from '../../../components/footer/footer'
import styles from "./signin.module.css"

const page = () => {
  return (
    <>
    <Navbar />
    <section className={styles.signin}>
        <SignIn />
    </section>
    <Footer />
    </>
  )
}

export default page