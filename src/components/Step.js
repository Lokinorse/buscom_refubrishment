import React, { useCallback, useEffect, useState } from "react";
import { Options } from "./Options";
import { SelectedOption } from "./SelectedOption";
import { find } from "lodash";
import { MenuItem } from "./MenuItem";
import { ProductCard } from "./ProductCard";

//todo: remove react router dom

export const Step = ({ step, setTotalData, scheme, totalData }) => {
  const { name, products, sort_order } = step;
  const [selectedOption, setSelectedOption] = useState(null);
  const setSelectedOptionHandler = (val) => {
    const updatedSelectedOption = { ...val };
    if (step.name === "Установка сидений" && scheme.id != 9) {
      updatedSelectedOption.quantity = scheme.seats;
      setSelectedOption(updatedSelectedOption);
      return;
    }
    setSelectedOption(updatedSelectedOption);
  };

  useEffect(() => {
    let currentSelectOption;
    const currentStepInTotalData = totalData[Number(step.category_id)];
    if (currentStepInTotalData) {
      const currentSelectOptionId =
        currentStepInTotalData.selected_option.product_id;
      currentSelectOption = find(step.products, {
        product_id: String(currentSelectOptionId),
      });
      if (!currentSelectOption) return;
      if (selectedOption.product_id === currentSelectOption.product_id) return;
      setSelectedOptionHandler(currentSelectOption);
    }
  }, [step, totalData]);

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
      if (selectedOption === null) {
        if (!prev[step.category_id]) return prev;
        const updatedPrev = { ...prev };
        delete updatedPrev[step.category_id];
        return updatedPrev;
      }
      const rest = { ...prev[step.category_id] };
      const totalProperties = {
        ...rest,
        cat_name: name,
        selected_option: {
          product_id: selectedOption.product_id,
          price: selectedOption.price,
          count: selectedOption.quantity,
          name: selectedOption.name,
        },
      };
      return { ...prev, [step.category_id]: totalProperties };
    });
  }, [selectedOption]);
  console.log(1);
  const subcategories = step?.subcategories || [];
  console.log("subcategories", subcategories);
  return (
    <div className="step_wrapper">
      <MenuItem title={name}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
          {subcategories.map((subCat) => {
            return (
              <Step
                step={subCat}
                scheme={scheme}
                key={subCat.category_id}
                setTotalData={setTotalData}
                totalData={totalData}
              />
            );
          })}
        </div>

        {/*       <div className="card_wrapper">
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
            totalData={totalData}
            stepId={step.category_id}
          />
        </div>
      </div> */}
      </MenuItem>
    </div>
  );
};
