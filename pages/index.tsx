import Layout from "../layouts/Main";
import PageIntro from "../components/page-intro";
import ProductsFeatured from "../components/products-featured";
import Footer from "../components/footer";
import Subscribe from "../components/subscribe";
import ReviewsFeatured from "./../components/reviews-featured/index";
import CheckFeatured from './../components/check-featured/index';
import Download from './../components/download-banner/index';

const IndexPage = () => {
  return (
    <Layout>
      <PageIntro />

      <section className="featured">
        <div className="container">
          <article
            style={{ backgroundImage: "url(/images/featured-1.jpg)" }}
            className="featured-item featured-item-large"
          >
            <div className="featured-item__content">
              <h3>New arrivals are now in!</h3>
              <a href="#" className="btn btn--rounded">
                Show Collection
              </a>
            </div>
          </article>

          <article
            style={{ backgroundImage: "url(/images/featured-2.jpg)" }}
            className="featured-item featured-item-small-first"
          >
            <div className="featured-item__content">
              <h3>Basic sneakers $29,99</h3>
              <a href="#" className="btn btn--rounded">
                More details
              </a>
            </div>
          </article>

          <article
            style={{ backgroundImage: "url(/images/featured-3.jpg)" }}
            className="featured-item featured-item-small"
          >
            <div className="featured-item__content">
              <h3>Sale this summer</h3>
              <a href="#" className="btn btn--rounded">
                VIEW ALL
              </a>
            </div>
          </article>
        </div>
      </section>

      <Subscribe />

      <section className="section">
        <div className="container">
          <ReviewsFeatured />
          <header className="section__intro">
            <h4>Why should you choose us?</h4>
          </header>

          <ul className="shop-data-items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>
                  All purchases over $199 are eligible for free shipping via
                  USPS First Class Mail.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-payment"></i>
              <div className="data-item__content">
                <h4>Easy Payments</h4>
                <p>
                  All payments are processed instantly over a secure payment
                  protocol.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Money-Back Guarantee</h4>
                <p>
                  If an item arrived damaged or you've changed your mind, you
                  can send it back for a full refund.
                </p>
              </div>
            </li>

            <li>
              <i className="icon-materials"></i>
              <div className="data-item__content">
                <h4>Finest Quality</h4>
                <p>
                  Designed to last, each of our products has been crafted with
                  the finest materials.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <CheckFeatured />

      <section className="Authen-content">
        <div className="site-footer__description">
          <h6>
            <a>
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "orange",
                }}
              >
                Authenticate
              </div>
              <br />
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: "normal",
                  textAlign: "center",
                  color: "black",
                }}
              >
                Your Favorite Brands Shoes
              </div>
            </a>
          </h6>
        </div>
        <div className="logo-content">
          <img
            className="brand-img"
            src="\brand-img\nike.png"
            alt="nike"
          />
          <img
            className="brand-img"
            src="\brand-img\Adidas.png"
            alt="black logo nike background @transparentpng.com"
          />
          <img
            className="brand-img"
            src="\brand-img\newBlance.png"
            alt="black logo nike background @transparentpng.com"
          />
          <img
            className="brand-img"
            src="\brand-img\vans.png"
            alt="black logo nike background @transparentpng.com"
          />
          <img
            className="brand-img"
            src="\brand-img\puma.png"
            alt="black logo nike background @transparentpng.com"
          />
          <img
            className="brand-img"
            src="\brand-img\jordan.png"
            alt="black logo nike background @transparentpng.com"
          />
          
        </div>
      </section>

      <ProductsFeatured />
      
      <Download />
      <Footer />
    </Layout>
  );
};

export default IndexPage;
