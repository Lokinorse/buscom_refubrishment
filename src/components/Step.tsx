import React, { useCallback, useContext, useEffect, useState } from "react";
import { find } from "lodash";
import { MenuItem } from "./MenuItem";
import { ProductCard } from "./ProductCard/ProductCard";
import { TotalDataContext } from "./Refubrishment";
import { getStepTotalSum } from "../utils/helpers";

//todo: remove react router dom

export const Step = ({
  allParents,
  step,
  openedMenus,
  isSeats = false,
  forceOpen = false,
}) => {
  const { name, products, sort_order, column } = step;
  const { totalData2, scheme } = useContext(TotalDataContext);
  const stepTotalSum = getStepTotalSum(totalData2, step.category_id, scheme);
  const subcategories = step?.subcategories || [];
  return (
    <div className="step_wrapper" key={name}>
      <MenuItem
        title={name}
        forceOpen={forceOpen}
        rightTitle={
          stepTotalSum ? (
            <div
              className="price"
              style={{ marginRight: "20px", color: "#19b500" }}
            >{`${stepTotalSum} ₽`}</div>
          ) : (
            ""
          )
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {products.map((product) => (
            <ProductCard
              allParents={allParents}
              parentCat={step.category_id}
              canPurchaseSingleProduct={column === "666"}
              key={product.product_id}
              product={product}
              isSeats={isSeats}
            />
          ))}
          {subcategories.map((subCat) => {
            return (
              <Step
                allParents={[...allParents, subCat.category_id]}
                key={subCat.category_id}
                openedMenus={openedMenus}
                forceOpen={openedMenus.includes(subCat.category_id)}
                isSeats={isSeats}
                step={subCat}
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
