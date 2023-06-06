import React from "react";
import { each } from "lodash";

const reduceNumberFromString = (price) => {
  if (typeof price === "number") return price;
  const numberString = price.replace(/\s/g, "");
  const number = parseInt(numberString);
  return number;
};

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

export const TotalWidget = ({ totalData }) => {
  return (
    <div className="total_wrapper">
      <div className="total">
        <h3>РАСЧЁТ: </h3>
        <div className="total_body">
          {Object.values(totalData).map((item) => {
            const itemPrice = getItemPriceString(item);
            return (
              <div className="ordered_item" key={item.cat_name}>
                <div className="ordered_item_title">{item.cat_name}</div>
                <div className="step_option">
                  <div className="price_position">
                    <div className="selected_option_name">
                      {item.selected_option.name}
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
                            return (
                              <div className="price_position">
                                <div className="selected_option_name">
                                  {
                                    item.additional_options[optionKey]
                                      .option_name
                                  }
                                </div>
                                <div className="selected_option_price">
                                  {additionalOptionPrice}
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
      </div>
    </div>
  );
};
