import { debounce } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { upLoadAllImage } from "./../../firebase/firebase";

function FormSubmit() {
  const router = useRouter();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);


  const [productName, setProductName] = useState<string>();
  const [brandName, setBrandName] = useState<string>();
  const [quality, setQuality] = useState<string>();
  const [priceBuy, setPriceBuy] = useState<number>();
  const [priceSell, setPriceSell] = useState<number>();
  const [warranty, setWarranty] = useState<string>();
  const [contact, setContact] = useState<string>();

  type UserInfo = {
    _id: string;
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

  // console.log(accountUser?._id);

  // if (accountUser) {
  //   //setAccountUser(JSON.parse(accountUser));
  // }

  const handldeSubChange = async () => {
    const listData = {
      productName: productName,
      brandName: brandName,
      quality: quality,
      isFullbox: true,
      priceSell: priceSell,
      priceBuy: priceBuy,
      warranty: warranty,
      contact: contact,
      customerId: accountUser?._id,
    };
    console.log("lst", listData);

    const response = await fetch(
      "https://soleauthenticity.azurewebsites.net/api/request-sell-secondhands/request-sell-secondhand",
      {
        method: "POST",
        body: JSON.stringify(listData),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    console.log("data", data.data);
    previewUrls.map((url) => {
      let requestImageData = {
        imgPath: url,
        requestSellSecondHandId: data.data,
      };
      console.log(requestImageData);

      return fetch(
        "https://soleauthenticity.azurewebsites.net/api/product-secondhand-images/product-secondhand-image",
        {
          method: "POST",
          body: JSON.stringify(requestImageData),
          headers: { "Content-Type": "application/json" },
        }
      );
    });
    router.push("/");
  };

  const onFilesUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No files were chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    /** Files validation */
    const validFiles: File[] = [];
    for (let i = 0; i < fileInput.files.length; i++) {
      const file = fileInput.files[i];

      if (!file.type.startsWith("image")) {
        alert(`File with idx: ${i} is invalid`);
        continue;
      }

      validFiles.push(file);
    }

    if (!validFiles.length) {
      alert("No valid files were chosen");
      return;
    }

    upLoadAllImage(validFiles, setPreviewUrls);
  };
  console.log("img", previewUrls);
  const handleProductName = debounce((e: any) => {
    setProductName(e.target.value);
  }, 700);

  const handleBrandName = debounce((e: any) => {
    setBrandName(e.target.value);
  }, 700);

  const handlePriceBuy = debounce((e: any) => {
    setPriceBuy(parseInt(e.target.value));
  }, 700);

  const handlePriceSell = debounce((e: any) => {
    setPriceSell(parseInt(e.target.value));
  }, 700);

  const handleWarranty = debounce((e: any) => {
    setWarranty(e.target.value);
  }, 700);

  const handleContact = debounce((e: any) => {
    setContact(e.target.value);
  }, 700);

  const handleQuanlity = debounce((e: any) => {
    setQuality(e.target.value);
  }, 700);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        border: "1px solid black",
        height: "400px",
        textAlign: "center",
        padding: "15px 16px",
        borderRadius: "30px",
        backgroundColor: "var(--color-orange)",
      }}
    >
      {/* <form
        style={{
          width: "330px",
          height: "317px",
          border: "1px solid black",
          borderRadius: "30px",
          backgroundColor: "white",
        }}
        className="w-full p-3 border border-gray-500 border-dashed"
        onSubmit={() => handldeSubChange()}
      > */}
      {previewUrls.length > 0 ? (
        <>
          <button
            onClick={() => setPreviewUrls([])}
            className="mb-3 text-sm font-medium text-gray-500 transition-colors duration-300 hover:text-gray-900"
          >
            Clear Previews
          </button>

          <div
            className="flex flex-wrap justify-start"
            style={{
              width: "321px",
              height: "264px",
              display: "flex",
              flexWrap: "wrap",
              overflowY: "scroll",
              marginLeft: "5px",
            }}
          >
            {previewUrls.map((previewUrl, idx) => (
              <div
                key={idx}
                className="w-full p-1.5 md:w-1/2"
                style={{ width: "100px", height: "100px" }}
              >
                <Image
                  alt="file uploader preview"
                  objectFit="cover"
                  src={previewUrl}
                  width={100}
                  height={100}
                  layout="responsive"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <label className="flex flex-col items-center justify-center h-full py-8 transition-colors duration-150 cursor-pointer hover:text-gray-600">
          <img
            style={{
              width: "300px",
              height: "300px",
              marginTop: "35px",
              marginLeft: '30px',
              backgroundColor: 'white',
              borderRadius: '30px',
              border: "1px solid black",
            }}
            src="/images/logos/upload-image.png"
          ></img>
          {/* <strong style={{ color: "black" }} className="text-sm font-medium">
              Select images
            </strong> */}
          <input
            className="block w-0 h-0"
            type="file"
            onChange={onFilesUploadChange}
            multiple
            hidden
          />
        </label>
      )}
      {/* </form> */}

      {/* <form
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "900px",
          height: "298px",
          alignItems: "center",
          alignContent: "space-evenly",
          flexDirection: "row",
        }}
      > */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
          padding: "20px",
          marginLeft: "100px",
        }}
      >
        <div
          className="form__col"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <input
            style={{
              height: "50px",
              borderRadius: "70px",
              backgroundColor: "white",
            }}
            className="form__input form__input--sm"
            type="text"
            placeholder="Product Name"
            required
            onChange={(e) => handleProductName(e)}
          />

          <input
            style={{
              height: "50px",
              borderRadius: "70px",
              backgroundColor: "white",
            }}
            className="form__input form__input--sm"
            type="text"
            placeholder="Brand Name"
            required
            onChange={(e) => handleBrandName(e)}
          />

          <input
            style={{
              height: "50px",
              borderRadius: "70px",
              backgroundColor: "white",
            }}
            className="form__input form__input--sm"
            type="text"
            placeholder="Price Sell"
            required
            onChange={(e) => handlePriceSell(e)}
          />
        </div>
        <div
          className="form__col"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <input
            style={{
              height: "50px",
              borderRadius: "70px",
              backgroundColor: "white",
            }}
            className="form__input form__input--sm"
            type="text"
            placeholder="Warranty"
            required
            onChange={(e) => handleWarranty(e)}
          />

          <input
            style={{
              height: "50px",
              borderRadius: "70px",
              backgroundColor: "white",
            }}
            className="form__input form__input--sm"
            type="text"
            placeholder="Contact"
            required
            onChange={(e) => handleContact(e)}
          />

          <input
            style={{
              height: "50px",
              borderRadius: "70px",
              backgroundColor: "white",
            }}
            className="form__input form__input--sm"
            type="text"
            placeholder="Quantity"
            required
            onChange={(e) => handleQuanlity(e)}
          />
          {/* <div
            className="products-filter__block__content"
            style={{
              marginLeft: "15px",
              fontWeight: "bold",
              paddingTop: "15px",
            }}
          >
            <Checkbox name="product-type" label="Full Box" type="true"/>
          </div> */}
        </div>

        <div
          style={{
            display: "flex",
            width: "510px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <input
              style={{
                height: "50px",
                borderRadius: "70px",
                backgroundColor: "white",
              }}
              className="form__input form__input--sm"
              type="text"
              placeholder="Price Buy"
              required
              onChange={(e) => handlePriceBuy(e)}
            />
          </div>
          <div>
            <button
              className="btn btn--rounded btn--yellow"
              type="submit"
              style={{ backgroundColor: "white" }}
              onClick={() => handldeSubChange()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}

export default FormSubmit;
