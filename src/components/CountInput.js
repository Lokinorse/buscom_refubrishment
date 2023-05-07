import React, { useState } from "react";

export const CountInput = ({ option, selectedOption, setCountToTotalData }) => {
  const [value, setValue] = useState(option.value);
  const handleValueChange = (e) => {
    const inputValue = parseInt(e.target.value);
    const newVal = inputValue >= 1 ? inputValue : 1;
    setValue(newVal);
    setCountToTotalData(newVal);
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
          {(
            value * parseInt(selectedOption.price.replace(/\s/g, ""))
          ).toLocaleString("ru-RU")}
        </span>{" "}
        руб.
      </span>
    </div>
  );
};
