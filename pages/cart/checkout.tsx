import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "store";
import CheckoutStatus from "../../components/checkout-status";
import CheckoutItems from "../../components/checkout/items";
// import { ProductStoreType } from 'types';
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { removeProduct } from "store/reducers/cart";
import Layout from "../../layouts/Main";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //const { errors } = useForm();
  const [address, setAddress] = useState<string>('');
  // const [ids, setIds] = useState<number[]>();
  const listId: number[] = [];
  const priceTotal = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => {
        // console.log(item.noDiscount);
        if (item.salePrice != null) {
          totalPrice += item.salePrice * item.count;
        } else {
          totalPrice += item.noDiscount * item.count;
        }
      });
    }
    return totalPrice;
  });

  const cart: any = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;

    return cartItems;
  });

  // const successful = () => {
  //   toast.success("Đặt hàng thành công", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: false,
  //   });
  // };

  // const fail = () => {
  //   toast.error("Đơn hàng không hợp lệ, xin vui lòng kiểm tra lại thông tin", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: 20000,
  //   });
  // };

  // const addressValidate = () => {
  //   toast.error("Đơn hàng không hợp lệ, xin vui lòng kiểm tra lại thông tin", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: 20000,
  //   });
  // };

  const ids = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    if (cartItems.length > 0) {
      cartItems.map((item) => {
        listId.push(parseInt(item.id));
      });
    }

    return listId;
  });
  // console.log("is: ",typeof(listId));

  const listQuantities: number[] = [];

  const quantities = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    // console.log("cart", cartItems);

    if (cartItems.length > 0) {
      cartItems.map((item) => {
        listQuantities.push(item.count);
      });
    }

    return listQuantities;
  });
  // console.log("count quanti", quantities);

  // const handleInputAddress = (e: any) => {
  //   // e.preventDefault();
  //   setAddress(e.target.value);
  // };

  type UserInfo = {
    _id: number;
    name: string;
    role: string;
  };

  const [accountUser, setAccountUser] = useState<UserInfo>();

  useEffect(() => {
    const storeObject = localStorage.getItem("user");
    if (storeObject) {
      setAccountUser(JSON.parse(storeObject));
    }
  }, []);

  const handleChangeInputAddress = debounce((e: any) => {
    setAddress(e.target.value);
  }, 500);

  console.log("Address: ", address);

  // setTimeout(() => {}, 500);
  async function handleCheckout() {
    if (address != "") {
      let createOrderData = {
        totalPrice: priceTotal,
        customerId: accountUser?._id,
        shippingAddress: address,
      };
      //console.log("hi", createOrderData);
      const response = await fetch(
        "https://soleauthenticity.azurewebsites.net/api/orders/order",
        {
          method: "POST",
          body: JSON.stringify(createOrderData),
          headers: { "Content-Type": "application/json" },
        }
      );

      const dataRes = await response.json();
      try {
        const promises = ids.map((id, index) => {
          // console.log(id);
          // console.log(dataRes.data);
          // console.log(quantities[index]);
          const creatOrderDetailsData: any = {
            orderId: dataRes.data,
            productId: id,
            quantity: quantities[index],
          };
          return fetch(
            "https://soleauthenticity.azurewebsites.net/api/order-details/order-detail",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(creatOrderDetailsData),
            }
          );
        });

        const responses = await Promise.all(promises);
        if (responses != null) {
          toast.success("Đặt hàng thành công");
        } else {
          toast.error("Đơn hàng không hợp lệ, xin vui lòng kiểm tra lại thông tin");
        }
        // successful();
        //.log(responses);

        dispatch(removeProduct(cart));
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Đơn hàng không hợp lệ, xin vui lòng kiểm tra lại thông tin")
    }
  }

  // const handleOnSubmit = () => {
  //   if (address == "") {
  //     toast.error("that bai");
  //   }
  //   return;
  // };

  return (
    <Layout>
      <section className="cart">
        <form className="form">
          <div className="container">
            <div className="cart__intro">
              <h3 className="cart__title">Shipping and Payment</h3>
              <CheckoutStatus step="checkout" />
            </div>

            <div className="checkout-content">
              <div className="checkout__col-6">
                <div className="checkout__btns">
                  {accountUser ? (
                    <a
                      href="/cart/checkout"
                      style={{
                        borderRadius: "10px 10px 0 0",
                        cursor: "pointer",
                      }}
                    >{`${accountUser.name}`}</a>
                  ) : (
                    <a href="/login" style={{ borderRadius: "10px" }}>
                      <button className="btn btn--rounded btn--yellow">
                        Log in
                      </button>
                    </a>
                  )}
                </div>

                <div className="block">
                  <h3 className="block__title">Shipping information</h3>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Address"
                        required
                        // value={address}
                        onChange={handleChangeInputAddress}
                        //onClick={addressValidate}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="checkout__col-4">
                <div className="block">
                  <h3 className="block__title">Payment method</h3>
                  <ul className="round-options round-options--three">
                    <li
                      className="round-item"
                      style={{
                        width: "100%",
                        color: "green",
                        border: "1px solid green",
                      }}
                    >
                      <i
                        style={{ fontFamily: "poppins" }}
                        className="icon-delivery-fast"
                      >
                        Thanh toán khi nhận hàng
                      </i>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="checkout__col-2">
                <div className="block">
                  <h3 className="block__title">Your cart</h3>
                  <CheckoutItems />

                  <div className="checkout-total">
                    <p>Total cost</p>
                    <h3>${priceTotal}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="cart-actions cart-actions--checkout">
              <a href="/cart" className="cart__btn-back">
                <i className="icon-left"></i> Back
              </a>

              <div className="cart-actions__items-wrapper">
                <button type="button" className="btn btn--rounded btn--border">
                  Continue shopping
                </button>
                {accountUser ? (
                  <button
                    onClick={() => handleCheckout()}
                    type="button"
                    className="btn btn--rounded btn--yellow"
                  >
                    Proceed to payment
                  </button>
                ) : (
                  <a href="/login"></a>
                )}
                {/* <button
                  onClick={handleCheckout}
                  type="submit"
                  className="btn btn--rounded btn--yellow"
                >
                  Proceed to payment
                </button> */}
                {/* {accountUser ? (
                  <button
                    onClick={
                      accountUser && priceTotal > 0
                        ? { handleCheckout } && successful
                        : fail
                    }
                    type="submit"
                    className="btn btn--rounded btn--yellow"
                  >
                    Proceed to payment
                  </button>
                ) : (
                  <a href="/login">
                    <button
                      onClick={
                        accountUser == null && priceTotal <= 0
                          ? { handleCheckout } && fail
                          : successful
                      }
                      type="submit"
                      className="btn btn--rounded btn--yellow"
                    >
                      Proceed to payment
                    </button>
                  </a>
                )} */}
                {/* <button
                  className="btn btn--rounded btn--yellow"
                  type="button"
                  onClick={() => handleCheckout()}
                >
                  Proceed to payment
                </button> */}

                <ToastContainer />
              </div>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
