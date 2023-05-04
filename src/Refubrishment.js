import React, { useEffect } from "react";
import { Step } from "./components/Step";
import { useRefubrishmentQueries } from "./services/useRefubrishmentServices";

export const Refubrishment = () => {
  console.log(1);
  const { steps } = useRefubrishmentQueries();
  console.log(2);
  return (
    <div class="container">
      <h1>Переоборудование 2.0</h1>
      {steps.map((step) => {
        return <Step step={step} key={step.order} />;
      })}
    </div>
  );
};
