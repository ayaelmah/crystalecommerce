import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <Image
        width={2000}
        height={2000}
        src={"/images/main/bg1.jpg"}
        alt="main"
        />
        <h1>The Most beautiful Jewels in the market !</h1>
        <button>Buy Now</button>
      </main>
    </div>
  );
}
