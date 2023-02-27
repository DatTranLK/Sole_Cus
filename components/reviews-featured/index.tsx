
import React, {useEffect, useState} from 'react';
import { ReviewTypeList } from 'types';
import ReviewsCarousel from './carousel';


const ReviewsFeatured = () => {
  const [data, setData] = useState<ReviewTypeList[]>([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch('https://soleauthenticity.azurewebsites.net/api/reviews/cus');
        const resData = await res.json();

        setData(resData.data);
      }

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [])


  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Reviews</h3>
          <a href="/reviews" className="btn btn--rounded btn--border">Show All</a>
        </header>

        <ReviewsCarousel reviewcas={data} />
      </div>
    </section>
  )
};

export default ReviewsFeatured