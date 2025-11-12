import React from "react";
import type { Variation } from "../../../shared/types";
import styles from "./VariationSelector.module.css";

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
    <div className={styles.container}>
      <label className={styles.label}>Variations</label>
      <div className={styles.checkboxGroup}>
        {variations.map((variation) => {
          const variationId = variation.id?.toString() || "0";
          const isSelected = selectedVariations.includes(variationId);
          const isDisabled = selectedVariations.length === 1 && isSelected;

          return (
            <label
              key={variationId}
              className={`${styles.checkboxLabel} ${
                isSelected
                  ? styles.selected
                  : theme === "dark"
                  ? styles.dark
                  : styles.light
              } ${isDisabled ? styles.disabled : ""}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleChange(variationId)}
                className={styles.checkbox}
                disabled={isDisabled}
              />
              <span className={styles.checkboxText}>{variation.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
