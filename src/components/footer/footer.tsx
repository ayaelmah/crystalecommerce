"use client"
import React from 'react';
import styles from "./footer.module.css";
import Image from 'next/image';
import Link from 'next/link';

const footer = () => {
  return (
    <footer className={styles.footer}>
      <article>
        <h1>Sahara Sparkle</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat enim quod est. Cupiditate  omnis?</p>
      </article>
      <article className={styles.pages}>
        <h1>Pages</h1>
        <ul className={styles.pagesLinks}>
            <Link href={"/"}>Category1</Link>
            <Link href={"/"}>Category2</Link>
            <Link href={"/"}>Category3</Link>
            <Link href={"/"}>Category4</Link>
        </ul>
      </article>
      <article className={styles.contact}>
        <h1>Contact Us</h1>
        <ul>
          <li>+212 123456789</li>
          <li>aya@gmail.com</li>
          <li>
            <Link href={"/"}>            
              <Image
              src={"/images/icons/facebook.png"}
              width={40}
              height={40}
              alt='facebook'
              />
            </Link>

            <Link href={"/"}>            
              <Image
              src={"/images/icons/instagram.png"}
              width={40}
              height={40}
              alt='instagram'
              />
            </Link>

            <Link href={"/"}>            
              <Image
              src={"/images/icons/linkdin.png"}
              width={40}
              height={40}
              alt='linkdin'
              />
            </Link>
          </li>
        </ul>
      </article>
    </footer>
  )
}

export default footer