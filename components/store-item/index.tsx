import Link from "next/link";
// import { some } from "lodash";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleFavProduct } from "store/reducers/user";
// import { RootState } from "store";
// import { useEffect, useState } from "react";
import { StoreTypeList } from "types";

const StoreItem = ({ id, name, address, avatar }: StoreTypeList) => {
  // const dispatch = useDispatch();
  // const { favProducts } = useSelector((state: RootState) => state.user);

  // const isFavourite = some(favProducts, (storeId) => storeId === id);

  // const [data, setData] = useState<StoreTypeList>();
  // const [isRender, setIsRender] = useState<boolean>(false);

  // const toggleFav = () => {
  //   dispatch(
  //     toggleFavProduct({
  //       idToggle,
  //     })
  //   );
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(
  //       "https://soleauthenticity.azurewebsites.net/api/stores?page=1&pageSize=10"
  //     );
  //     const dataRes = await res.json();
  //     setData(dataRes.data);
  //     console.log(dataRes.data);
  //     setIsRender(true);
  //   };

  //   fetchData();
  // }, []);

  return (
        <div
          className="product-item"
          style={{
            border: "1px solid black",
            borderRadius: "20px",
            height: "130px",
            cursor: "pointer",
          }}
        >
          <div
            className="product__image"
            style={{ width: "100px", height: "100px", borderRadius: "20px" }}
          >
            <Link href={`/store/${id}`}>
            <a>
              <img
                style={{
                  borderRadius: "20px",
                  textAlign: "left",
                  marginLeft: "15px",
                  marginTop: "15px",
                }}
                src={avatar}
                alt="product"
              />
            </a>
            </Link>
          </div>

      <Link href={`/store/${id}`}>
        <div
          className="product__description"
          style={{
            marginTop: "-120px",
            marginLeft: "150px",
            cursor: "pointer",
          }}
        >
          <h3 style={{ fontWeight: "bold" }}>{name}</h3>
          <div style={{display: "inline-block"}}>
            <img
              src="/images/location.png"
              alt=""
              style={{ width: "30px", height: "30px" }}
            />
            <h3>{address}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StoreItem;
