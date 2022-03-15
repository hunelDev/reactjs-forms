import { useContext } from "react";
import { checkForCustomValidation } from "./custom";
import FormContext from "./formContext";
import { checkForPrimaryValidation } from "./primary";
import {
  CustomValidateObject,
  PrimaryValidateObject,
  ValidationResult,
} from "../types";

export function useFormValidation<T extends { [id: string]: ValidationResult }>(
  ids: string[]
): () => T;
export function useFormValidation<T extends { [id: string]: ValidationResult }>(
  ...ids: string[]
): () => T;
export function useFormValidation<T extends { [id: string]: ValidationResult }>(
  ...ids: [string[]] | [...string[]]
): () => T {
  const context = useContext(FormContext);
  return function () {
    const result = { ...context!.validationResults };
    if (!ids.length) return result as T;

    return Object.keys(result).reduce((prev: any, current) => {
      if (Array.isArray(ids[0])) {
        if (ids[0].includes(current)) prev[current] = result[current];
        return prev;
      }

      if ((ids as string[]).includes(current)) prev[current] = result[current];
      return prev;
    }, {}) as T;
  };
}

export const getValidationResult = (
  value: string | readonly string[] | number,
  identity: string,
  validation?: PrimaryValidateObject,
  customValidation?: CustomValidateObject
) => {
  let validationResult: ValidationResult = [];

  if (validation) {
    const primaryValidationResult = checkForPrimaryValidation(
      validation,
      value,
      identity
    );
    validationResult = validationResult.concat(primaryValidationResult);
  }

  if (customValidation) {
    const customValidationResult = checkForCustomValidation(
      customValidation,
      value,
      identity
    );
    validationResult = validationResult.concat(customValidationResult);
  }

  return validationResult;
};
