"use client"
import React from 'react'
import styles from "./contact.module.css";

const page = () => {
  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "6a3643b8-2722-40d5-955f-888b84d56b30");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
    });
    const result = await response.json();
    if (result.success) {
        console.log(result);
    }
}

  return (
    <section className={styles.contact}>
        <h1 className={styles.title}>Contact Us</h1>
        <form onSubmit={handleSubmit} >
        <input type="hidden" name="access_key" value="6a3643b8-2722-40d5-955f-888b84d56b30" />
            <h3>Name: </h3>
            <input type="text" />
            <h3>Email</h3>
            <input type="text" />
            <h3>Message</h3>
            <textarea placeholder='Message...' name="" id=""></textarea>
            <button>Send Message</button>
        </form>
    </section>
  )
}

export default page