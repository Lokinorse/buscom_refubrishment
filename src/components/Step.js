import React, { useState } from "react";
import { Options } from "./Options";
import { find } from "lodash";

const htmlDecode = (content) => {
  let e = document.createElement("div");
  e.innerHTML = content;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

export const Step = ({ step }) => {
  const { name, products, sort_order } = step;
  console.log("step", step);
  const [selectedOption, setSelectedOption] = useState(
    find(products, { name: "Нет" })
  );
  // TODO: CHANGE IMAGE SRC PATH TO RELATIVE
  return (
    <div class="card_wrapper">
      <h3 class="card_title">{`Шаг ${sort_order}. ${name}`}</h3>
      <div class="card_content_wrapper">
        <Options
          options={products}
          setSelectedOption={setSelectedOption}
          activeOptionId={selectedOption.product_id}
        />
        <div class="card_selected_option_content">
          <h4>{`${name}: ${selectedOption.name}`}</h4>
          <div class="img_wrapper">
            <img src={`https://bus-com.ru/image/${selectedOption.image}`}></img>
          </div>
          {selectedOption.name !== "Нет" && (
            <>
              <div class="product_price">{selectedOption.price}</div>
              <div
                class="product_description"
                dangerouslySetInnerHTML={{
                  __html: htmlDecode(selectedOption.description),
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
