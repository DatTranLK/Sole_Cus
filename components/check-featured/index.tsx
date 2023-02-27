import useSwr from 'swr';
import React from 'react';
import CheckCarousel from './carousel';

const CheckFeatured = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSwr('/api/checks', fetcher);

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Checked</h3>
          <a href="/products" className="btn btn--rounded btn--border">Show All</a>
        </header>

        <CheckCarousel checked={data} />
      </div>
    </section>
  )
};

export default CheckFeatured