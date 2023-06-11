import React, { useState } from "react";
import { Step } from "./components/Step";
import { TotalWidget, SchemeChoose } from "./components";
import { useRefubrishmentQueries } from "./services/useRefubrishmentServices";

export const Refubrishment = () => {
  const { steps } = useRefubrishmentQueries();
  const [scheme, setScheme] = useState(null);
  const [totalData, setTotalData] = useState({});
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
                  key={step.category_id}
                  setTotalData={setTotalData}
                />
              );
            })}
          </div>
          <TotalWidget totalData={totalData} />
        </div>
      ) : (
        <SchemeChoose setScheme={setScheme} />
      )}
    </div>
  );
};
