import { useContext } from "react";
import { checkForCustomValidation } from "./custom";
import FormContext from "./formContext";
import { checkForPrimaryValidation } from "./primary";
import {
  CustomValidateObject,
  PrimaryValidateObject,
  ValidaitonCombined,
  ValidationResult,
  ValidationResults,
} from "../types";
import { checkResultIsValid } from "./helper";

export function useFormValidation<T extends ValidationResults>(): (
  ...ids: [string[]] | [...string[]]
) => { result: ValidationResults; isValid: boolean } {
  const context = useContext<ValidaitonCombined>(FormContext);
  return function (...ids: [string[]] | [...string[]]) {
    const result = { ...context?.validationState?.validationResults };
    const keys = Object.keys(result);
    if (!ids.length) {
      return { result, isValid: checkResultIsValid(result) };
    }

    const filteredResult = keys.reduce((prev: any, current) => {
      if (Array.isArray(ids[0])) {
        if (ids[0].includes(current)) prev[current] = result[current];
        return prev;
      }

      if ((ids as string[]).includes(current)) prev[current] = result[current];
      return prev;
    }, {}) as T;
    return {
      result: filteredResult,
      isValid: checkResultIsValid(filteredResult),
    };
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
