import React, { useCallback, useEffect, useState } from "react";
import { Options } from "./Options";
import { SelectedOption } from "./SelectedOption";
import { find } from "lodash";

//option_value_id: "62" - подлокотник
//option_value_id: "125" - откидная спинка

export const Step = ({ step, setTotalData, scheme }) => {
  const { name, products, sort_order } = step;
  const [selectedOption, setSelectedOption] = useState(
    find(products, { name: "Нет" })
  );

  const setCountToTotalData = useCallback(
    (val) => {
      setTotalData((prevState) => ({
        ...prevState,
        [step.category_id]: {
          ...prevState[step.category_id],
          selected_option: {
            ...prevState[step.category_id].selected_option,
            count: val,
          },
        },
      }));
    },
    [setTotalData]
  );

  const setOptionsToTotalData = useCallback(
    (id, optionName, option) => {
      setTotalData((prevState) => ({
        ...prevState,
        [step.category_id]: {
          ...prevState[step.category_id],
          additional_options: {
            ...prevState[step.category_id].additional_options,
            [id]: { ...option, option_name: optionName },
          },
        },
      }));
    },
    [setTotalData, scheme]
  );

  useEffect(() => {
    setTotalData((prev) => {
      if (selectedOption.name === "Нет") {
        if (!prev[step.category_id]) return prev;
        const updatedPrev = { ...prev };
        delete updatedPrev[step.category_id];
        return updatedPrev;
      }
      const totalProperties = {
        cat_name: name,
        selected_option: {
          price: selectedOption.price,
          count: selectedOption.quantity,
          name: selectedOption.name,
        },
      };
      return { ...prev, [step.category_id]: totalProperties };
    });
  }, [selectedOption]);

  const setSelectedOptionHandler = (val) => {
    if (step.name === "Установка сидений" && scheme.id != 9) {
      val.quantity = scheme.seats;
      setSelectedOption(val);
      return;
    }
    setSelectedOption(val);
  };

  return (
    <div className="card_wrapper">
      <h3 className="card_title">{`Шаг ${sort_order}. ${name}`}</h3>
      <div className="card_content_wrapper">
        <Options
          options={products}
          setSelectedOption={setSelectedOptionHandler}
          activeOptionId={selectedOption.product_id}
        />
        <SelectedOption
          stepName={name}
          selectedOption={selectedOption}
          setCountToTotalData={setCountToTotalData}
          setOptionsToTotalData={setOptionsToTotalData}
          scheme={scheme}
        />
      </div>
    </div>
  );
};
