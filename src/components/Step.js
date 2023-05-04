import React from "react";
import { Options } from "./Options";

export const Step = ({ step }) => {
  const { title, products } = step;
  return (
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img class="h-48 w-full object-cover md:w-48" src="" alt="Product" />
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {title}
          </div>
          <div class="mt-2 text-gray-500 text-xs">dscription</div>
          <div class="mt-2">
            <div class="flex">
              <Options options={products} />;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
