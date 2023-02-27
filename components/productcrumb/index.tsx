// import { GetServerSideProps } from "next";
import React from "react";
import { ProductTypeList } from "types";

type ProductCrumbType = {
  product: ProductTypeList;
};


const Productcrumb = ({ product }: ProductCrumbType) => {
  return (
    <section className="breadcrumb">
      <div className="container">
        <ul className="breadcrumb-list">
          <li>
            <a href="/">
              <i className="icon-home"></i>
            </a>
          </li>
          <li>
            <a href="/products">All Products</a>
          </li>
          <li>
            <a>{product.name}</a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Productcrumb;
