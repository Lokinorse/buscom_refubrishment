import React, { useCallback, useEffect, useState } from "react";
import { Options } from "./Options";
import { SelectedOption } from "./SelectedOption";
import { find } from "lodash";
import { MenuItem } from "./MenuItem";
import { ProductCard } from "./ProductCard/ProductCard";

//todo: remove react router dom

export const Step = ({
  step,
  setTotalData,
  scheme,
  totalData,
  dispatch,
  totalData2,
}) => {
  const { name, products, sort_order } = step;
  const [selectedOption, setSelectedOption] = useState(null);
  const setSelectedOptionHandler = (val) => {
    const updatedSelectedOption = { ...val };
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
    (val: any) => {
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

  /*   useEffect(() => {
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
  }, [selectedOption]); */

  const subcategories = step?.subcategories || [];
  return (
    <div className="step_wrapper" key={name}>
      <MenuItem title={name}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
          {subcategories.map((subCat) => {
            return (
              <div key={subCat.category_id}>
                <Step
                  totalData2={totalData2}
                  dispatch={dispatch}
                  step={subCat}
                  scheme={scheme}
                  setTotalData={setTotalData}
                  totalData={totalData}
                />
              </div>
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
