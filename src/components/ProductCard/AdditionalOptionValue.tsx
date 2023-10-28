import React, { useContext, useState } from "react";
import { IProductOption, IProductOptionValue, ITotalData } from "../../types";
import { Checkbox } from "../../ui-components/Checkbox";
import { ITotalDataState, TotalDataContext } from "../Refubrishment";
import { reduceNumberFromString } from "../../utils/helpers";
import { getOptionSystemName } from "../../components/SchemeChoose.js";

// Функция, получающая значение чекбокса из totalData. В случае, если опция не выбрана - возвращает "Нет"
const getCheckedValue = (
  totalData2: ITotalDataState,
  productId: string,
  option: IProductOption
) => {
  const flbck = "Нет";
  if (!totalData2.products.length) return flbck;
  const targetProduct = totalData2.products.find(
    (p) => p.product_id === productId
  );
  if (!targetProduct || !targetProduct.additional_options?.length) return flbck;
  const targetProductOption = targetProduct.additional_options.find(
    (a) => a.id === option.option_id
  );
  if (!targetProductOption) return flbck;
  return targetProductOption.chosenOptionValue.name;
};

/**
 * Айтем из дополнительных опций. Может быть чекбоксом или радио
 */
export const AdditionalOptionValue = ({
  option,
  productId,
  disabled = false,
  cachedState,
}: {
  cachedState: ITotalData;
  productId: string;
  option: IProductOption;
  disabled?: boolean;
}) => {
  const [dispatlocalState, setLocalState] = useState(cachedState);
  const { scheme, dispatch } = useContext(TotalDataContext);

  const schemeMultiplier = scheme[getOptionSystemName(option.name)] || 1;
  const handleCheckboxClick = (chosenOptionValue: IProductOptionValue) => {
    const payload = {
      productId,
      chosenOption: { name: option.name, id: option.option_id },
      chosenOptionValue: {
        name: chosenOptionValue.name,
        id: chosenOptionValue.option_value_id,
        price: reduceNumberFromString(chosenOptionValue.price),
        count: schemeMultiplier,
      },
    };
    dispatch({
      type: "toggleAdditionalOptionCheckbox",
      payload: { ...payload, shouldFreeze: true },
    });
  };

  const checkedValue = getCheckedValue(cachedState, productId, option);

  return (
    <div className="additional_option_value">
      {option.name}
      <Checkbox
        schemeMultiplier={schemeMultiplier}
        disabled={disabled}
        checkedValue={checkedValue}
        option={option}
        handleClick={handleCheckboxClick}
      />
    </div>
  );
};
