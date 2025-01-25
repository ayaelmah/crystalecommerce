"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Product from "@/components/product/product";
import { getFeaturedProductsServer } from "@/server/product";

export default function Home() {

  const [featured, setFeatured] = useState([]);
  const [images, setImages] = useState(["/images/main/bg1.jpg", "/images/main/bg2.jpg", "/images/main/bg3.jpg", "/images/main/bg4.jpg", "/images/main/bg5.jpg"]);
  const [index, setIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  const nextReview = () =>{
    if (reviewIndex < 4) setReviewIndex(reviewIndex + 1);
    else setReviewIndex(0);
  }

  const prevIndex = () =>{
    if (reviewIndex == 0) setReviewIndex(4);
    else setReviewIndex(reviewIndex - 1);
  }

  const getFeatures = async() =>{
    const res: any = await getFeaturedProductsServer();
    setFeatured(res);
  }

  useEffect(()=>{
    getFeatures();
  }, [])

  return (
    <div>
      <main className={styles.main}>
        <Image
        className={`${index == 0 ? styles.appear : ""}`}
        width={2000}
        height={2000}
        src={"/images/main/bg1.jpg"}
        alt="main"
        />
        <Image
          className={`${index == 1 ? styles.appear : ""}`}
        width={2000}
        height={2000}
        src={"/images/main/bg2.jpg"}
        alt="main"
        />
        <Image
        className={`${index == 2 ? styles.appear : ""}`}
        width={2000}
        height={2000}
        src={"/images/main/bg3.jpg"}
        alt="main"
        />
        <Image
      className={`${index == 3 ? styles.appear : ""}`}
        width={2000}
        height={2000}
        src={"/images/main/bg4.jpg"}
        alt="main"
        />
        <div className={styles.content}>
        <h1>The Most beautiful Jewels in the market !</h1>
        <button>Buy Now</button>
        </div>

        <div className={styles.change}>
          <div
          className={`${index == 0 ? styles.active : ""}`}
          onClick={() => setIndex(0)}></div>
          <div
          className={`${index == 1 ? styles.active : ""}`}
          onClick={() => setIndex(1)}></div>
          <div
          className={`${index == 2 ? styles.active : ""}`}
          onClick={() => setIndex(2)}></div>
          <div
          className={`${index == 3 ? styles.active : ""}`}
          onClick={() => setIndex(3)}></div>
        </div>
      </main>

      {/***********  Brands ************/}

      <section className={styles.brands}>
        <Image
        src={"/images/brands/br1.svg"}
        width={70}
        height={70}
        alt="brand1"
        />
        <Image
        src={"/images/brands/br2.svg"}
        width={70}
        height={70}
        alt="brand2"
        />
        <Image
        src={"/images/brands/br3.svg"}
        width={70}
        height={70}
        alt="brand3"
        />
        <Image
        src={"/images/brands/br4.svg"}
        width={70}
        height={70}
        alt="brand4"
        />
        <Image
        src={"/images/brands/br5.svg"}
        width={70}
        height={70}
        alt="brand5"
        />
      </section>

      {/***********  About Us ************/}

      <section className={styles.aboutus}>
        <Image
          src={"/images/main/bg2.jpg"}
          height={1500}
          width={1500}
          alt="aboutus"
        />
        <div className={styles.content}>
          <h1>About Us</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quia labore quis nesciunt aspernatur, rerum corrupti quae voluptates accusantium. Vitae cum incidunt eveniet dolorum soluta nam animi fuga, quibusdam, expedita ratione eius tenetur adipisci saepe. Laudantium, sed ipsa ratione architecto deserunt atque obcaecati voluptatum. Error debitis nobis incidunt a quis.
          </p>
        </div>
      </section>
      <br></br>
      <br />
      <br />
      {/***********  What do we sell ************/}

      <section className={styles.aboutus}>
        <div className={styles.content}>
          <h1>Highest Quality Moroccan Jewels!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quia labore quis nesciunt aspernatur, rerum corrupti quae voluptates accusantium. Vitae cum incidunt eveniet dolorum soluta nam animi fuga, quibusdam, expedita ratione eius tenetur adipisci saepe. Laudantium, sed ipsa ratione architecto deserunt atque obcaecati voluptatum. Error debitis nobis incidunt a quis.
          </p>
        </div>
        <Image
          src={"/images/main/bg3.jpg"}
          height={1500}
          width={1500}
          alt="quality"
        />
      </section>

      {/***********  Reviews ************/}

      <section className={styles.reviews}>
        <h1 className={styles.title}>Reviews</h1>
        <article className={styles.reviewsGrid}>
          <div className={styles.person + " " + `${reviewIndex == 0 ? styles.appear : ""}`}>
            <Image
              src={"/images/people/pr1.jpg"}
              width={80}
              height={80}
              alt="person"
            />
            <h1>Aya El Mahraoui</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem impedit ipsum illum totam consequuntur debitis non, voluptas quasi amet esse voluptatem ab ad aliquam unde accusantium facere culpa repellat officia.</p>
          </div>
          <div className={styles.person + " " + `${reviewIndex == 1 ? styles.appear : ""}`}>
            <Image
              src={"/images/people/pr2.jpg"}
              width={80}
              height={80}
              alt="person"
            />
            <h1>John doe</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem impedit ipsum illum totam consequuntur debitis non, voluptas quasi amet esse voluptatem ab ad aliquam unde accusantium facere culpa repellat officia.</p>
          </div>
          <div className={styles.person + " " + `${reviewIndex == 2 ? styles.appear : ""}`}>
            <Image
              src={"/images/people/pr3.jpg"}
              width={80}
              height={80}
              alt="person"
            />
            <h1>Janet Doe</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem impedit ipsum illum totam consequuntur debitis non, voluptas quasi amet esse voluptatem ab ad aliquam unde accusantium facere culpa repellat officia.</p>
          </div>
          <div className={styles.person + " " + `${reviewIndex == 3 ? styles.appear : ""}`}>
            <Image
              src={"/images/people/pr4.jpg"}
              width={80}
              height={80}
              alt="person"
            />
            <h1>Random El Persona</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem impedit ipsum illum totam consequuntur debitis non, voluptas quasi amet esse voluptatem ab ad aliquam unde accusantium facere culpa repellat officia.</p>
          </div>
          <div className={styles.person + " " + `${reviewIndex == 4 ? styles.appear : ""}`}>
            <Image
              src={"/images/people/pr5.jpg"}
              width={80}
              height={80}
              alt="person"
            />
            <h1>Chaddett Elronia</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem impedit ipsum illum totam consequuntur debitis non, voluptas quasi amet esse voluptatem ab ad aliquam unde accusantium facere culpa repellat officia.</p>
          </div>
        <div className={styles.change}>
          <Image
          src={"/images/icons/left.png"}
          height={70}
          width={70}
          alt="left"
          onClick={()=> prevIndex()}
          />
          <Image
          src={"/images/icons/right.png"}
          height={70}
          width={70}
          alt="right"
          onClick={()=> nextReview()}
          />
        </div>
        </article>
      </section>

      {/***********  Contact Us ************/}
      <section className={styles.contactus}>
        <h1 className={styles.title}>Contact Us</h1>
        <article className={styles.content}>
          <h1>Share your feedback</h1>
          <Link href="/">
          <button>Contact Page 
            <Image
            src="/images/icons/right.png"
            width={50}
            height={50}
            alt="contact"
            />
            </button>
          </Link>
        </article>
      </section>

      {/***********  Featured Products ************/}
      <section className={styles.featured}>
        <h1 className={styles.title}>Featured Products</h1>
        <div className={styles.featuredGrid}>
          {
            featured.map((item: any)=>{
              return <Product key={item.id} item={item} />
            })
          }
        </div>
      </section>
    </div>
  );
}
