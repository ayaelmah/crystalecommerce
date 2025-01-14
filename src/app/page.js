import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../components/navbar/navbar"
import Footer from "../components/footer/footer"
import Main from "../components/main/main";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}
