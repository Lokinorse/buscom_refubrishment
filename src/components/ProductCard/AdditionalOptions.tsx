import React from "react";
import { IProductOption } from "../../types";
import { AdditionalOptionValue } from "./AdditionalOptionValue";

/**
 * Блок с дополнительными опциями
 * @param param0
 */

export const AdditionalOptions = ({
  disabled,
  options,
  productId,
}: {
  disabled: boolean;
  productId: string;
  options: IProductOption[];
}) => {
  return (
    <div className={`additional_options ${disabled ? "disabled" : ""}`}>
      {options.map((o) => {
        return (
          <AdditionalOptionValue
            disabled={disabled}
            key={o.option_id}
            productId={productId}
            option={o}
          />
        );
      })}
    </div>
  );
};
