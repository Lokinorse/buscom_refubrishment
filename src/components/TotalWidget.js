import React, { useState } from "react";
import { each } from "lodash";
import { reduceNumberFromString } from "../utils/helpers";

const getAdditionalOptionItemPrice = (option) => {
  if (!option.quantity) return;
  return option.quantity * reduceNumberFromString(option.price);
};

const getItemPriceString = (item) => {
  const rawPrice = item.selected_option.price;
  if (item.selected_option.count) {
    return item.selected_option.count * reduceNumberFromString(rawPrice) + " ₽";
  }
  if (typeof rawPrice === "string") {
    return rawPrice.replace("руб.", "₽");
  } else {
    return rawPrice + " ₽";
  }
};

const getTotal = (totalData) => {
  let total = 0;
  each(totalData, (item) => {
    const additionalOptions = item.additional_options;
    const itemPrice = reduceNumberFromString(item.selected_option.price);
    const itemsCount = item.selected_option.count;
    if (itemsCount) {
      total += itemPrice * itemsCount;
    } else {
      total += itemPrice;
    }
    if (additionalOptions) {
      each(additionalOptions, (option) => {
        const additionalOptionCount = option.quantity;
        const additionalOptionsPrice = reduceNumberFromString(option.price);
        if (additionalOptionsPrice) {
          total += additionalOptionsPrice * additionalOptionCount;
        }
      });
    }
  });
  return total;
};

export const TotalWidget = ({ totalData, scheme, resetSchemeHandler }) => {
  console.log("totalData", totalData);
  const choosenSchemeText =
    scheme.id !== 9 ? `Выбранная схема: ${scheme.title}` : "";
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div className="total_wrapper">
      <div className="total">
        <h3>РАСЧЁТ: </h3>
        <div className="total_body">
          {Object.values(totalData).map((item) => {
            const itemPrice = getItemPriceString(item);
            const itemCountPostfix =
              item.selected_option?.count && item.selected_option?.count > 1
                ? `X ${item.selected_option.count}`
                : "";
            return (
              <div className="ordered_item" key={item.cat_name}>
                <div className="ordered_item_title">{item.cat_name}</div>
                <div className="step_option">
                  <div className="price_position">
                    <div className="selected_option_name">
                      {`${item.selected_option.name} ${itemCountPostfix}`}
                    </div>
                    <div className="selected_option_price">{itemPrice}</div>
                  </div>
                  <>
                    {item?.additional_options
                      ? Object.keys(item?.additional_options).map(
                          (optionKey) => {
                            const additionalOptionPrice =
                              getAdditionalOptionItemPrice(
                                item?.additional_options[optionKey]
                              );
                            if (!additionalOptionPrice) return null;
                            const additionalOption =
                              item.additional_options[optionKey];
                            return (
                              <div className="price_position">
                                <div className="selected_option_name">
                                  {additionalOption.option_name +
                                    " X " +
                                    additionalOption.quantity}
                                </div>
                                <div className="selected_option_price">
                                  {`${additionalOptionPrice} ₽`}
                                </div>
                              </div>
                            );
                          }
                        )
                      : null}
                  </>
                </div>
              </div>
            );
          })}
          ВСЕГО: {getTotal(totalData) + " ₽"}
        </div>
        <div className="total_body">
          {choosenSchemeText}
          <div
            className="scheme_choose_option_img"
            style={{
              height: "150px",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${require(`../assets/img/${scheme.img}`)})`,
            }}
          />
          <button onClick={() => setShowDialog(true)}>Поменять схему</button>
          <dialog open={showDialog ? "open" : false}>
            <header>
              <div>Выбранная вами схема не сохранится. Продолжить?</div>
              <button onClick={resetSchemeHandler}>Да</button>
              <button onClick={() => setShowDialog(false)}>Нет</button>
            </header>
            <section></section>
          </dialog>
        </div>
      </div>
    </div>
  );
};
