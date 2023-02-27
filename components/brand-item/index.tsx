// import Link from "next/link";
// import { some } from "lodash";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleFavProduct } from "store/reducers/user";
// import { RootState } from "store";
import Link from "next/link";
import React from "react";
import { BrandTypeList } from "types";

const BrandItem = ({ id, name, avatar }: BrandTypeList) => {

  return (
    <div className="brand-item">
      <Link href={`/brand/${id}`}>
        <div className="brand__image">
          <img
            key={id}
            className="brand_img"
            src={avatar}
            alt="product"
          />
        </div>
      </Link >

      <div className="brand__name">{name}</div>
    </div>
  );
};

export default BrandItem;
