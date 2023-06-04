import React, { useState } from "react";

export const ProductOption = ({ option }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    //onChange(value);
  };
  return (
    <div className="product_option">
      <h3>{option.name}</h3>
      <div className="product_option_select_options_wrapper">
        {option.product_option_value.map((value) => (
          <div key={value.product_option_value_id}>
            <label>
              <input
                type="checkbox"
                value={value.option_value_id}
                checked={selectedValue === value.option_value_id}
                onChange={handleCheckboxChange}
              />
              {value.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
