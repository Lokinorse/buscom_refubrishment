import React from "react";
import { Options } from "./Options";

export const Step = ({ step }) => {
  console.log("1111", step);
  const { name, products, order } = step;
  console.log(`categoryName: ${name}\ncategoryElements: ${name} `);

  return (
    <div class="card_wrapper">
      <h3 class="card_title">{`Шаг ${order + 1}. ${name}`}</h3>
      <div class="card_content_wrapper">
        <Options options={products} />
        <div class="card_selected_option_content"></div>
      </div>
    </div>
  );
};
