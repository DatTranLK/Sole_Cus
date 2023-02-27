import { useSelector } from "react-redux";
import CheckoutStatus from "../../components/checkout-status";
import Item from "./item";
import { RootState } from "store";
import { useEffect, useState } from "react";

const ShoppingCart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const [images, setImages] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://soleauthenticity.azurewebsites.net/api/products/cus"
      );
      const resData = await res.json();
      let ids = cartItems.map((a: any) => a.id);
      let newArr = resData.data.filter((x: any) => ids.includes(x.id));
      console.log("New arr", newArr);
      setImages(newArr);
      // console.log("Cart item: ", cartItems)
    };

    fetchData();
  }, [cartItems]);

  // console.log("Cart Item: ", cartItems);

  const priceTotal = () => {
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => {
        console.log(item.noDiscount);
        if (item.salePrice != null) {
          totalPrice += item.salePrice * item.count;
        } else {
          totalPrice += item.noDiscount * item.count;
        }
      });
    }

    return totalPrice;
  };

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left" }}>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Ammount</th>
                  <th>Price</th>
                  <th></th>
                </tr>

                {cartItems.map((item) => {
                  const testId = images?.filter((i: any) => i.id === item.id);
                  // console.log("testID: ", testId.slice(0, 1).shift()?.imgPath);
                  return (
                    <Item
                      key={item.id}
                      id={item.id}
                      imgPath={testId && testId.length > 0 ? (testId.slice(0, 1).shift()?.imgPath?? "") : ""}
                      name={item.name}
                      color={item.color}
                      salePrice={item.salePrice}
                      noDiscount={item.noDiscount}
                      size={item.size}
                      count={item.count}
                    />
                  );
                })}
              </tbody>
            </table>
          )}

          {cartItems.length === 0 && <p>Nothing in the cart</p>}
        </div>

        <div className="cart-actions">
          <a href="/products" className="cart__btn-back">
            <i className="icon-left"></i> Continue Shopping
          </a>
          <input
            type="text"
            placeholder="Promo Code"
            className="cart__promo-code"
          />

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">
              Total cost <strong>${priceTotal().toFixed(2)}</strong>
            </p>
            <a href="/cart/checkout" className="btn btn--rounded btn--yellow">
              Checkout
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
