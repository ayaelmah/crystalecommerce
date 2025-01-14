"use client"
import React from 'react'
import styles from "./contact.module.css"
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'

const page = () => {

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "63472165-3a83-4abf-9c99-1889113206d9");
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
    
        const data = await response.json();
    
        if (data.success) {
          event.target.reset();
        } else {
          console.log("Error", data);
        }
      };

  return (
    <>
    <Navbar />
    <section className={styles.contact}>
        <h1 className={styles.title}>
            Contact Us
        </h1>
        <form onSubmit={onSubmit}>
        <input placeholder='Name...' type="text" name="name" required/>
        <input placeholder='Email...'  type="email" name="email" required/>
        <textarea name="message" required></textarea>

        <button type="submit">Submit Form</button>

      </form>
    </section>
    <Footer />
    </>
  )
}

export default page