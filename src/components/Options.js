import React from "react";

export const Options = ({ options, setSelectedOption, activeOptionId }) => {
  return (
    <div className="options_wrapper">
      {options.map((option) => (
        <div
          className={
            option.product_id === activeOptionId
              ? "active_option option"
              : "option"
          }
          onClick={() => setSelectedOption(option)}
          key={option.product_id}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
};
