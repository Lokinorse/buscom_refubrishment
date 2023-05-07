import React, { useState } from "react";
import { Step } from "./components/Step";
import { TotalWidget } from "./components/TotalWidget";
import { useRefubrishmentQueries } from "./services/useRefubrishmentServices";

export const Refubrishment = () => {
  const { steps } = useRefubrishmentQueries();
  const [totalData, setTotalData] = useState({});
  console.log("totalData", totalData);
  return (
    <div className="container">
      <h1>Переоборудование 2.0</h1>
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
    </div>
  );
};
