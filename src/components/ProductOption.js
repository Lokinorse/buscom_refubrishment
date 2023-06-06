import React, { useState } from "react";

export const ProductOption = ({ option, setOptionsToTotalData }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleCheckboxChange = (event, optionId, optionName) => {
    const valueString = event.target.value;
    const value = JSON.parse(valueString);
    console.log(value);
    setSelectedValue(value.product_option_value_id);
    setOptionsToTotalData(optionId, optionName, value);
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
                value={JSON.stringify(value)} // Convert object to string
                checked={selectedValue === value.product_option_value_id}
                onChange={(event) =>
                  handleCheckboxChange(
                    event,
                    option.product_option_id,
                    option.name
                  )
                }
              />
              {value.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
