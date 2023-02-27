import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import List from './list';
// import { products } from './../../utils/data/products';


const ProductsContent = ({data}: any) => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);
  const router = useRouter();
  const {sid} = router.query;

  const [length, setLength] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://soleauthenticity.azurewebsites.net/api/products/store/${sid}/count`);
      const dataRes = await res.json();

      setLength(dataRes.data);

      console.log("Data: ", data);
    }

    fetchData();
  }, [])
  
  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>Sneaker's Tops <span>({length})</span></h2>
        <button type="button" onClick={() => setOrderProductsOpen(!orderProductsOpen)} className="products-filter-btn"><i className="icon-filters"></i></button>
        <form className={`products-content__filter ${orderProductsOpen ? 'products-order-open' : ''}`}>
          <div className="products__filter__select">
            <h4>Show products: </h4>
            <div className="select-wrapper">
              <select>
                <option>Popular</option>
              </select>
            </div>
          </div>
          <div className="products__filter__select">
            <h4>Sort by: </h4>
            <div className="select-wrapper">
              <select>
                <option>Popular</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <List data={data} />
    </section>
  );
};
  
export default ProductsContent
  