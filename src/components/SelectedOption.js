import React from "react";
import { CountInput } from "./CountInput";
import { ProductOption } from "./ProductOption";

const htmlDecode = (content) => {
  let e = document.createElement("div");
  e.innerHTML = content;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};
// TODO: CHANGE IMAGE SRC PATH TO RELATIVE
export const SelectedOption = ({
  stepName,
  selectedOption,
  setCountToTotalData,
}) => {
  return (
    <div className="card_selected_option_content">
      <h4>{`${stepName}: ${selectedOption.name}`}</h4>
      <div className="img_wrapper">
        <img src={`https://bus-com.ru/image/${selectedOption.image}`}></img>
      </div>
      {selectedOption.name !== "Нет" && (
        <>
          <div className="product_price">{selectedOption.price}</div>
          <div
            className="product_description"
            dangerouslySetInnerHTML={{
              __html: htmlDecode(selectedOption.description),
            }}
          />
        </>
      )}
      {selectedOption.options && selectedOption.options.length > 0 && (
        <div className="current-picked-opts">
          {selectedOption.options.map((option) => {
            console.log("OPTION", option);
            if (option.name === "Установка количества") {
              return (
                <CountInput
                  key={option.product_option_id}
                  option={option}
                  selectedOption={selectedOption}
                  setCountToTotalData={setCountToTotalData}
                />
              );
            }
            return (
              <ProductOption option={option} key={option.product_option_id} />
            );
          })}
        </div>
      )}
    </div>
  );
};
