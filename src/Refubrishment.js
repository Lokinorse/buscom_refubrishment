import React, { useState } from "react";
import { Step } from "./components/Step";
import { TotalWidget, SchemeChoose } from "./components";
import { useRefubrishmentQueries } from "./services/useRefubrishmentServices";
//test
export const Refubrishment = () => {
  const { steps } = useRefubrishmentQueries();
  const [scheme, setScheme] = useState(null);
  const [totalData, setTotalData] = useState({});

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
