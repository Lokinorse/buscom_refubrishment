import React, { useState } from "react";
import { reduceNumberFromString } from "../../utils/helpers";
// values which was already preseted in scheme
const presetOptionsIds = { 62: "armrests", 125: "foldingSeats" };

const getProductOptionSchemeBasedQuantity = (
  scheme,
  optionValue,
  customSeatsCount
) => {
  const schemeMultiplier = scheme.seats;
  // preset count to options from scheme if exists
  if (
    scheme.id != 9 &&
    Object.keys(presetOptionsIds)
      .map((item) => item + "")
      .includes(optionValue?.option_value_id)
  ) {
    return scheme[presetOptionsIds[optionValue?.option_value_id]];
  } else {
    return schemeMultiplier;
  }
};

const getThisOptionInTotalData = (totalData, option, stepId) => {
  if (
    !totalData[stepId] ||
    !totalData[stepId].additional_options ||
    !totalData[stepId].additional_options[option.product_option_id]
  )
    return;
  return totalData[stepId]?.additional_options[option.product_option_id];
};

export const ProductOption = ({
  option,
  setOptionsToTotalData,
  scheme,
  customSeatsCount,
  totalData,
  stepId,
}) => {
  const handleCheckboxChange = (event, optionId, optionName) => {
    const valueString = event.target.value;
    const value = JSON.parse(valueString);
    setOptionsToTotalData(optionId, optionName, value);
  };

  return (
    <div className="product_option">
      <h3>{option.name}</h3>
      <div className="product_option_select_options_wrapper">
        {option.product_option_value.map((optionValue) => {
          optionValue.count = getProductOptionSchemeBasedQuantity(
            scheme,
            optionValue,
            customSeatsCount
          );

          const optionQuantityAndPricePostfix =
            optionValue.name !== "Нет"
              ? ` X ${optionValue.count} (${reduceNumberFromString(
                  optionValue.price
                )} ₽)`
              : "";
          const thisOptionInTotalData = getThisOptionInTotalData(
            totalData,
            option,
            stepId
          );
          return (
            <div key={optionValue.product_option_value_id}>
              <label>
                <input
                  type="checkbox"
                  value={JSON.stringify(optionValue)}
                  checked={
                    thisOptionInTotalData?.product_option_value_id ===
                    optionValue.product_option_value_id
                  }
                  onChange={(event) =>
                    handleCheckboxChange(
                      event,
                      option.product_option_id,
                      option.name
                    )
                  }
                />
                {`${optionValue.name} ${optionQuantityAndPricePostfix}`}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
