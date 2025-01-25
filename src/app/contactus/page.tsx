import React from 'react'
import styles from "./contact.module.css";

const page = () => {
  return (
    <section className={styles.contact}>
        <h1 className={styles.title}>Contact Us</h1>
        <form action="https://api.web3forms.com/submit" method="POST">
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