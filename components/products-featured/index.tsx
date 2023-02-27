import ProductsCarousel from './carousel';
import { useEffect, useState } from 'react';

const ProductsFeatured = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://soleauthenticity.azurewebsites.net/api/products/cus');
      const resData = await res.json();

      setData(resData.data);
    }

    fetchData();
  }, [])

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Footwear</h3>
          <a href="/products" className="btn btn--rounded btn--border">Show All</a>
        </header>

        <ProductsCarousel products={data} />
      </div>
    </section>
  )
};

export default ProductsFeatured