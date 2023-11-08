import React, { useContext, useState } from "react";
import { TotalDataContext } from "../Refubrishment";
import { AdditionalOptions } from "./AdditionalOptions";
import { IProductCardProps } from "./types";
import {
  getNumberPriceFromProductPrice,
  beautifySum,
} from "../../utils/helpers";
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
      return (
        accumulator +
        currentProduct.chosenOptionValue.price *
          currentProduct.chosenOptionValue.count
      );
    }, 0) || 0;
  return {
    singleItemPrice: productSingleItemPrice,
    price: productSchemedPrice + additionalOptionsPrice,
    count: targetProduct.count || 1,
  };
};

export const ProductCard = ({
  allParents,
  parentCat,
  product,
  isSeats,
  canPurchaseSingleProduct,
}: IProductCardProps) => {
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
      payload: {
        ...productPayload,
        isUniqueForCategory: canPurchaseSingleProduct,
        allParents,
        parentCat,
      },
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

  const btnAnimationClassName = isProductSelected ? "toggle_rmv" : "toggle_add";
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
      <div className={`product_wrapper ${isProductSelected ? "chosen" : ""}`}>
        {product.image && <ImageModal image={product.image} />}
        <div className="product_card_no_img_block">
          <div className="info">
            <div className="title">{product.name}</div>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: htmlDecode(product.meta_description),
              }}
            />
          </div>
          {showOptions && (
            <ModalWindow title={product.name} onClose={cancelHandler}>
              <AdditionalOptions
                confirmHandler={confirmHandler}
                options={product.options}
                productId={product.product_id}
              />
            </ModalWindow>
          )}

          <div className="price_and_btns">
            <div className="price">{`${beautifySum(price)} ₽ ${
              count > 1 ? `(x${count})` : ""
            }`}</div>
            <div className="product_card_btns">
              {!!product.options?.length && (
                <button
                  disabled={!isProductSelected}
                  className={`refub_btn black_white_btn  ${
                    isProductSelected ? "show" : "hide"
                  }`}
                  onClick={() => setShowOptions(!showOptions)}
                >
                  Опции
                </button>
              )}
              <button
                className={`refub_btn add_button ${btnAnimationClassName}`}
                onClick={isProductSelected ? removeProduct : addProduct}
              >
                <div className={`product_btn_text ${btnAnimationClassName}`}>
                  <span>Добавить</span> <span>Удалить</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
