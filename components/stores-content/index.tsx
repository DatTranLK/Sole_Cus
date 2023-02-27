import React, { useEffect } from 'react';
import { useState } from 'react';
import List from './list';

const StoresContent = () => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);
  const [length, setLength] = useState<any>();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const resLength = await fetch('https://soleauthenticity.azurewebsites.net/api/stores/count');
        const lengthData = await resLength.json();
        setLength(lengthData.data);
      }

      
    fetchData();
    } catch (error) {
      console.log(error)
    }

  }, [])
  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>Shop's Tops <span>({length})</span></h2>
        <button type="button" onClick={() => setOrderProductsOpen(!orderProductsOpen)} className="products-filter-btn"><i className="icon-filters"></i></button>
        <form className={`products-content__filter ${orderProductsOpen ? 'products-order-open' : ''}`}>
        </form>
      </div>

      <List />
    </section>
  );
};
  
export default StoresContent
  