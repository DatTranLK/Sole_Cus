import React from 'react';
import { useState, useEffect } from 'react';
import List from './list';
// import { brands } from './../../utils/data/brands';

const BrandsContent = () => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);

  const [length, setLength] = useState<any>();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const resLength = await fetch('https://soleauthenticity.azurewebsites.net/api/brands/count');
        const lengthData = await resLength.json();
        setLength(lengthData.data);
        // console.log("data: " ,storeData.data);
      }

    fetchData();
    } catch (error) {
      console.log(error)
    }

  }, [])
  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>Brand's Tops <span>({length})</span></h2>
        <button type="button" onClick={() => setOrderProductsOpen(!orderProductsOpen)} className="products-filter-btn"><i className="icon-filters"></i></button>
        <form className={`products-content__filter ${orderProductsOpen ? 'products-order-open' : ''}`}>
        </form>
      </div>

      <List />
    </section>
  );
};
  
export default BrandsContent
  