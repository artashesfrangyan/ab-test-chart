import React from "react";
import type { Variation } from "../../../shared/types";

interface VariationSelectorProps {
  variations: Variation[];
  selectedVariations: string[];
  onVariationChange: (variationId: string) => void;
  theme: "light" | "dark";
}

export const VariationSelector: React.FC<VariationSelectorProps> = ({
  variations,
  selectedVariations,
  onVariationChange,
  theme,
}) => {
  const handleChange = (variationId: string) => {
    if (
      selectedVariations.length === 1 &&
      selectedVariations.includes(variationId)
    ) {
      return;
    }
    onVariationChange(variationId);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {variations.map((variation) => {
        const variationId = variation.id?.toString() || "0";
        const isSelected = selectedVariations.includes(variationId);

        return (
          <label
            key={variationId}
            className={`flex items-center cursor-pointer px-3 py-2 rounded border ${
              isSelected
                ? "bg-blue-500 text-white border-blue-500"
                : theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleChange(variationId)}
              className="mr-2"
              disabled={selectedVariations.length === 1 && isSelected}
            />
            {variation.name}
          </label>
        );
      })}
    </div>
  );
};
