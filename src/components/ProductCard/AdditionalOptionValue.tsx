import React, { useContext } from "react";
import { IProductOption, IProductOptionValue } from "../../types";
import { Checkbox } from "../../ui-components/Checkbox";
import { ITotalDataState, TotalDataContext } from "../Refubrishment";

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
}: {
  productId: string;
  option: IProductOption;
  disabled?: boolean;
}) => {
  const { totalData2, dispatch } = useContext(TotalDataContext);

  const handleCheckboxClick = (e, chosenOptionValue: IProductOptionValue) => {
    dispatch({
      type: "toggleAdditionalOptionCheckbox",
      payload: {
        productId,
        chosenOption: { name: option.name, id: option.option_id },
        chosenOptionValue: {
          name: chosenOptionValue.name,
          id: chosenOptionValue.option_value_id,
        },
      },
    });
  };

  const checkedValue = getCheckedValue(totalData2, productId, option);
  return (
    <div className="additional_option_value">
      {option.name}
      <Checkbox
        disabled={disabled}
        checkedValue={checkedValue}
        option={option}
        handleClick={handleCheckboxClick}
      />
    </div>
  );
};
