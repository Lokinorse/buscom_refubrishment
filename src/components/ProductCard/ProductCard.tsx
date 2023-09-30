import React, { useState } from "react";

const htmlDecode = (content) => {
  let e = document.createElement("div");
  e.innerHTML = content;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

export const ProductCard = ({ product, dispatch, totalData2 }) => {
  const [btnTouched, setBtnTouched] = useState(false);
  const addProduct = () => {
    dispatch({
      type: "addProduct",
      payload: product,
    });
    setBtnTouched(true);
  };

  const removeProduct = () => {
    dispatch({
      type: "removeProduct",
      payload: product,
    });
    setBtnTouched(true);
  };

  const isProductSelected = totalData2.products.some(
    (pr) => pr.product_id == product.product_id
  );

  const btnAnimationClassName = btnTouched
    ? isProductSelected
      ? "toggle_rmv"
      : "toggle_add"
    : "";
  return (
    <div>
      <div className="product_wrapper">
        {product.image && (
          <div className="img">
            <img src={`https://bus-com.ru/image/${product.image}`}></img>
          </div>
        )}
        <div className="info">
          <div className="title">{product.name}</div>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: htmlDecode(product.description),
            }}
          />
        </div>
        <div className="left_block">
          <div className="price">{product.price}</div>
          <button
            className={`add_button ${btnAnimationClassName}`}
            onClick={isProductSelected ? removeProduct : addProduct}
          >
            <div className={`product_btn_text ${btnAnimationClassName}`}>
              <span>Добавить</span> <span>Удалить</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
