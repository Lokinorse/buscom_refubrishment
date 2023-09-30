import React, { useState } from "react";

const purifyPrice = (val) => {
  if (typeof val === "string") {
    return parseInt(val.replace(/\s/g, ""));
  }
  return val;
};

export const CountInput = ({
  option,
  selectedOption,
  setCountToTotalData,
  setCustomSeatsCount,
}) => {
  const [value, setValue] = useState(option.value);
  const handleValueChange = (e) => {
    const inputValue = parseInt(e.target.value);
    const newVal = inputValue >= 1 ? inputValue : 1;
    setValue(newVal);
    setCountToTotalData(newVal);
    if (setCustomSeatsCount) setCustomSeatsCount(newVal);
  };
  return (
    <div key={option.name}>
      <label>Количество:</label>
      <input
        type="number"
        className="product-counts"
        min="1"
        step="1"
        value={value}
        onChange={handleValueChange}
      />
      <span className="nowrap">
        x {selectedOption.price} ={" "}
        <span className="temp-totals">
          {(value * purifyPrice(selectedOption.price)).toLocaleString("ru-RU")}
        </span>{" "}
        руб.
      </span>
    </div>
  );
};
