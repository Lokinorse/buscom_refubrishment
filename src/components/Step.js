import React, { useCallback, useEffect, useState } from "react";
import { Options } from "./Options";
import { SelectedOption } from "./SelectedOption";
import { find } from "lodash";

export const Step = ({ step, setTotalData }) => {
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
          name: selectedOption.name,
        },
      };
      return { ...prev, [step.category_id]: totalProperties };
    });
  }, [selectedOption]);

  return (
    <div className="card_wrapper">
      <h3 className="card_title">{`Шаг ${sort_order}. ${name}`}</h3>
      <div className="card_content_wrapper">
        <Options
          options={products}
          setSelectedOption={setSelectedOption}
          activeOptionId={selectedOption.product_id}
        />
        <SelectedOption
          stepName={name}
          selectedOption={selectedOption}
          setCountToTotalData={setCountToTotalData}
        />
      </div>
    </div>
  );
};
