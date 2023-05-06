import React, { useEffect } from "react";
import { Step } from "./components/Step";
import { useRefubrishmentQueries } from "./services/useRefubrishmentServices";

export const Refubrishment = () => {
  const { steps } = useRefubrishmentQueries();
  console.log("steps", steps);
  return (
    <div class="container">
      <h1>Переоборудование 2.0</h1>
      <div class="calculator_wrapper">
        <div class="calculator">
          {steps.map((step) => {
            return <Step step={step} key={step.order} />;
          })}
        </div>
        <div class="total"></div>
      </div>
    </div>
  );
};
