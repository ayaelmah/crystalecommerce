import React from 'react'
import styles from "./footer.module.css"
import Link from 'next/link'

const footer = () => {
  return (
    <footer className={styles.footer}>
        <article className={styles.logo}>
            <h1>LOGO</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias architecto autem totam consequuntur recusandae culpa explicabo iusto perferendis tenetur minima.</p>
        </article>
        <article className={styles.link}>
            <h3>Links</h3>
            <ul>
                <li><Link href="/">
                    Home
                </Link></li>
                <li><Link href="/">
                    About Us
                </Link></li>
                <li><Link href="/">
                    Products
                </Link></li>                
                <li><Link href="/">
                    Contact Us
                </Link></li>
            </ul>
        </article>
        <article>
            <h3>Contact Us</h3>
            <ul>
                <li>douaa@gmail.com</li>
                <li>+212 611211738</li>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
            </ul>
        </article>
    </footer>
  )
}

export default footer