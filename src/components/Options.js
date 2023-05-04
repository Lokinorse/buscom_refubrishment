import React from "react";

export const Options = ({ options }) => {
  return (
    <ul>
      {options.map((option) => (
        <li key={option.product_id}>{option.name}</li>
      ))}
    </ul>
  );
};
