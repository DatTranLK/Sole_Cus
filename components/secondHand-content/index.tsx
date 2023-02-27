import { useEffect, useState } from "react";
import FormSubmit from "./../form-submit/index";

const SecondHandContent = () => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);
  const [length, setLength] = useState<any>();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const resLength = await fetch(
          "https://soleauthenticity.azurewebsites.net/api/stores/count"
        );
        const lengthData = await resLength.json();
        setLength(lengthData.data);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <section className="products-content">
      <div className="products-content__intro">
        <h2>
          Second Hand Form <span>({length})</span>
        </h2>
        <button
          type="button"
          onClick={() => setOrderProductsOpen(!orderProductsOpen)}
          className="products-filter-btn"
        >
          <i className="icon-filters"></i>
        </button>
        <form
          className={`products-content__filter ${
            orderProductsOpen ? "products-order-open" : ""
          }`}
        ></form>
      </div>

      <FormSubmit />
    </section>
  );
};

export default SecondHandContent;
