import CheckItem from '../../check-item';


// import Swiper core and required components
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import { CheckTypeList } from 'types';

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 30;
if (process.browser) {
  if(window.innerWidth > 768) {
    slidesPerView = 3;
    spaceBetween = 35;
    centeredSlides = false;
  }
  if(window.innerWidth > 1024) {
    slidesPerView = 4;
    spaceBetween = 65;
    centeredSlides = false;
  }
}

type CheckCarouselType = {
  checked: CheckTypeList[]
}

const CheckCarousel = ({ checked }: CheckCarouselType) => {
  if (!checked) return <div>Loading</div>;

  return (
    <div className="products-carousel">
      <Swiper 
      spaceBetween={spaceBetween} 
      loop={true} 
      centeredSlides={centeredSlides} 
      watchOverflow={true} 
      slidesPerView={slidesPerView} 
      className="swiper-wrapper">
        {checked.map(item => (
          <SwiperSlide key={item.id}>
            <CheckItem 
              id={item.id} 
              name={item.name}
              color={item.color}
              status={item.status}
              key={item.id}
              images={item.images} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CheckCarousel