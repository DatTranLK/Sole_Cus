import { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
import Gallery from "../../components/product-single/gallery";
// import Reviews from "../../components/product-single/reviews";
import ProductsFeatured from "../../components/products-featured";
import Layout from "../../layouts/Main";
// import { server } from "../../utils/server";

// types
import { ProductTypeList } from "types";
import Productcrumb from "./../../components/productcrumb/index";
import { useRouter } from "next/router";


const Product = () => {
  const [showBlock, setShowBlock] = useState("description");

  const router = useRouter();
  const { pid } = router.query;

  const [data, setData] = useState<ProductTypeList>();
  const [images, setImages] = useState<object[]>([]);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const fetchData = async () => {
        const res = await fetch(
          `https://soleauthenticity.azurewebsites.net/api/products/product/${pid}`
        );
        const dataRes = await res.json();
  
        setData(dataRes.data);
  
        const resImage = await fetch(
          `https://soleauthenticity.azurewebsites.net/api/product-images/${pid}`
        );
        const resImageData = await resImage.json();
  
        setImages(resImageData.data);
        console.log("Image", resImageData);
      };
  
      fetchData();
    }
    
  }, [router.asPath, router.route]);

  return (
    <Layout>
      {data ? (
        <>
          <Productcrumb product={data} />

          <section className="product-single">
            <div className="container">
              <div className="product-single__content">
                <Gallery images={images} />
                <Content product={data} />
              </div>

              <div className="product-single__info">
                <div className="product-single__info-btns">
                  <button
                    type="button"
                    onClick={() => setShowBlock("description")}
                    className={`btn btn--rounded ${
                      showBlock === "description" ? "btn--active" : ""
                    }`}
                  >
                    Description
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBlock("reviews")}
                    className={`btn btn--rounded ${
                      showBlock === "reviews" ? "btn--active" : ""
                    }`}
                  >
                    Reviews (2)
                  </button>
                </div>

                <Description show={showBlock === "description"} />
                {/* <Reviews product={product} show={showBlock === "reviews"} /> */}
              </div>
            </div>
          </section>

          <div className="product-single-page">
            <ProductsFeatured />
          </div>
        </>
      ) : null}

      <Footer />
    </Layout>
  );
};

export default Product;
