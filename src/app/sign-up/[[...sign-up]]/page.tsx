import React from 'react'
import styles from "./signup.module.css";
import { SignUp } from '@clerk/nextjs';
import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer';

const page = () => {
  return (
    <>
    <Navbar/>
    <section className={styles.signup}>
    <SignUp />
    </section>
    <Footer />
    </>
  )
}

export default page