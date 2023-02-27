import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Scrollbar, Navigation } from "swiper";

SwiperCore.use([Scrollbar, Navigation]);

// type GalleryProductType = {
//   images: object[];
// };

const Gallery = ({ images }: any) => {
  return (
    <>
      {images ? (
        <>
          <section className="product-gallery">
            <div className="product-gallery__thumbs">
              {images.map((image: any) => (
                <div key={image?.id} className="product-gallery__thumb">
                  <img
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src =
                        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
                    }}
                    src={
                      image.imgPath ??
                      "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                    }
                    alt=""
                  />
                </div>
              ))}
            </div>

            <Swiper
              effect="slide"
              className="swiper-wrapper"
              style={{
                width: "500px",
                height: "500px",
                maxHeight: "500px",
                maxWidth: "500px",
              }}
            >
              {images.map((image: any) => (
                <SwiperSlide style={{ maxHeight: "500px", maxWidth: "500px" }}>
                  <div key={image.id}>
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
                      }}
                      src={
                        image.imgPath ??
                        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                      }
                      alt=""
                      style={{ width: "500px", height: "500px" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </>
      ) : (
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src =
              "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
          }}
          src={
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
          }
          alt=""
          style={{ width: "500px", height: "500px" }}
        />
      )}
    </>
  );
};

export default Gallery;
