import React, { useState, useEffect } from "react";
import { Step } from "./components/Step";
import { TotalWidget, SchemeChoose } from "./components";
import { useRefubrishmentQueries } from "./services/useRefubrishmentServices";
import { useQueryParam } from "./utils/hooks";
import { each } from "lodash";

const concatSandTDStrings = (oldString, newString) => {
  const parts = oldString.split("&");
  return parts[0] + "&" + newString;
};

const getTotalDataQueryString = (totalData) => {
  let tdString = "";
  each(totalData, (value, key) => {
    tdString += key + "_";
    tdString += "so_co" + value.selected_option.count;
    tdString += "so_pr_id" + value.selected_option.product_id;
  });
  return tdString;
};

export const Refubrishment = () => {
  const { steps } = useRefubrishmentQueries();
  const [scheme, setScheme] = useState(null);
  const [totalData, setTotalData] = useState({});
  ///console.log("scheme", scheme);
  console.log("totalData", totalData);
  const [queryParam, updateQueryParam] = useQueryParam("config", "");

  useEffect(() => {
    if (!scheme) {
      updateQueryParam("");
      return;
    }
    updateQueryParam("s=" + scheme.id + "&");
  }, [scheme]);

  useEffect(() => {
    updateQueryParam(
      concatSandTDStrings(queryParam, getTotalDataQueryString(totalData))
    );
  }, [totalData]);

  const setSchemeHandler = (chosenScheme) => {
    setScheme(chosenScheme);
  };

  const resetSchemeHandler = () => {
    setScheme(null);
    setTotalData({});
  };
  return (
    <div className="container">
      <h1>Переоборудование 2.0</h1>
      {scheme ? (
        <div className="calculator_wrapper">
          <div className="calculator">
            {steps.map((step) => {
              return (
                <Step
                  step={step}
                  scheme={scheme}
                  key={step.category_id}
                  setTotalData={setTotalData}
                />
              );
            })}
          </div>
          <TotalWidget
            totalData={totalData}
            scheme={scheme}
            resetSchemeHandler={resetSchemeHandler}
          />
        </div>
      ) : (
        <SchemeChoose setScheme={setSchemeHandler} />
      )}
    </div>
  );
};
