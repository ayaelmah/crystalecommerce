"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./products.module.css";
import Product from "@/components/product/product";
import Image from "next/image";
import { ProductContext } from "@/context/product";

const page = () => {
  const { products, getProducts, categories, getCategories }: any = useContext(ProductContext);
  const [filterProducts, setFilteredProducts] = useState(products);
  const [displayProducts, setDisplayProducts] = useState([]); 
  const [category, setCatogory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 

  const filterProductsFunc = () => {
    const filtered = products.filter((product: any) => {
      return (
        (category ? (category == "all" ? true : product.categoryId === category) : true) &&
        (minPrice ? product.price >= minPrice : true) &&
        (maxPrice ? product.price <= maxPrice : true) &&
        (maxWidth ? product.width <= maxWidth : true) &&
        (maxHeight ? product.height <= maxHeight : true)
      );
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const paginate = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayProducts(filterProducts.slice(startIndex, endIndex));
  };

  useEffect(() => {
    filterProductsFunc();
  }, [category, minPrice, maxPrice, maxWidth, maxHeight]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    paginate();
  }, [filterProducts, currentPage]);

  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  return (
    <section className={styles.products}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.productFlex}>
        <article className={styles.productsFilter}>
          <h2>Filter</h2>
          <select
            value={category}
            onChange={(e: any) => setCatogory(e.target.value)}
            name=""
            id=""
          >
            <option value="all">All</option>
            {categories?.map((item: any) => {
              return (
                <option key={item.id} value={`${item.id}`}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <div className={styles.minmax}>
            <div>
              <h3>Min Price: </h3>
              <input
                value={minPrice}
                onChange={(e: any) => setMinPrice(parseFloat(e.target.value))}
                type="number"
              />
            </div>
            <div>
              <h3>Max Price: </h3>
              <input
                value={maxPrice}
                onChange={(e: any) => setMaxPrice(parseFloat(e.target.value))}
                type="number"
              />
            </div>
            <div>
              <h3>Max Width: </h3>
              <input
                value={maxWidth}
                onChange={(e: any) => setMaxWidth(parseFloat(e.target.value))}
                type="number"
              />
            </div>
            <div>
              <h3>Max Height: </h3>
              <input
                value={maxHeight}
                onChange={(e: any) => setMaxHeight(parseFloat(e.target.value))}
                type="number"
              />
            </div>
          </div>
        </article>
        <section className={styles.productsGrid}>
          {displayProducts?.map((item: any) => {
            return <Product key={item.id} item={item} />;
          })}
        </section>
      </div>
      <div className={styles.change}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <Image src={"/images/icons/left.png"} width={50} height={50} alt="left" />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <Image src={"/images/icons/right.png"} width={50} height={50} alt="right" />
        </button>
      </div>
    </section>
  );
};

export default page;