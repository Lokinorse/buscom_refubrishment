import React, { useContext, useState } from "react";
import { TotalDataContext } from "../Refubrishment";
import { AdditionalOptions } from "./AdditionalOptions";
import { IProductCardProps } from "./types";
import { getNumberPriceFromProductPrice } from "../../utils/helpers";
import { ModalWindow } from "../../ui-components/ModalWindow";
import { ImageModal } from "../../ui-components/Image";

const htmlDecode = (content) => {
  let e = document.createElement("div");
  e.innerHTML = content;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

// Цена вместе с опциями
const getFullPrice = (product, totalData2) => {
  const productSingleItemPrice = getNumberPriceFromProductPrice(product.price);
  const targetProduct = totalData2.products.find(
    (p) => p.product_id === product.product_id
  );
  if (!targetProduct)
    return {
      price: productSingleItemPrice,
      singleItemPrice: productSingleItemPrice,
      count: 1,
    };
  const productSchemedPrice = targetProduct.count
    ? productSingleItemPrice * targetProduct.count
    : productSingleItemPrice;

  const additionalOptionsPrice =
    targetProduct?.additional_options?.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.chosenOptionValue.price;
    }, 0) || 0;
  return {
    singleItemPrice: productSingleItemPrice,
    price: productSchemedPrice + additionalOptionsPrice,
    count: targetProduct.count || 1,
  };
};

export const ProductCard = ({ product, isSeats }: IProductCardProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const { totalData2, dispatch, scheme } = useContext(TotalDataContext);
  const [btnTouched, setBtnTouched] = useState(false);
  // кастомное количество сидений, в случае, если выбрана тема
  const productPayload = isSeats
    ? { ...product, count: scheme.seats }
    : product;
  const addProduct = () => {
    dispatch({
      type: "addProduct",
      payload: productPayload,
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

  const cancelHandler = () => {
    setShowOptions(false);
    dispatch({ type: "restoreFrozenState", payload: null });
  };

  const confirmHandler = () => {
    setShowOptions(false);
    dispatch({ type: "forgetFrozenState", payload: null });
  };

  const { price, singleItemPrice, count } = getFullPrice(product, totalData2);
  return (
    <div>
      <div className="product_wrapper">
        {product.image && <ImageModal image={product.image} />}
        <div className="info">
          <div className="title">{product.name}</div>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: htmlDecode(product.meta_description),
            }}
          />
          {!!product.options?.length && (
            <button
              className={`extra_options_button ${
                isProductSelected ? "show" : ""
              }`}
              onClick={() => setShowOptions(!showOptions)}
            >
              Дополнительные опции
            </button>
          )}
          {showOptions && (
            <ModalWindow title={product.name} onClose={cancelHandler}>
              <AdditionalOptions
                confirmHandler={confirmHandler}
                options={product.options}
                productId={product.product_id}
              />
            </ModalWindow>
          )}
        </div>
        <div className="left_block">
          <div className="price">{`${price} ₽ ${
            count > 1 ? `(x${count})` : ""
          }`}</div>
          <button
            className={`add_button ${btnAnimationClassName}`}
            onClick={isProductSelected ? removeProduct : addProduct}
          >
            <div className={`product_btn_text ${btnAnimationClassName}`}>
              <span>{isProductSelected ? "Удалить" : "Добавить"}</span>
              {/* <span>Добавить</span> <span>Удалить</span> */}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
