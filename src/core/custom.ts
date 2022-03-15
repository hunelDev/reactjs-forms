import { CustomValidateObject, ValidationResult } from "../types";

export const checkForCustomValidation = (
  validateObject: CustomValidateObject,
  value: string | readonly string[] | number,
  identity: string
) => {
  const trimedValue = Array.isArray(value)
    ? value.map((val) => val.trim())
    : value.toString().trim();

  const validateKeys = Object.keys(validateObject);
  return validateKeys.reduce((validationResult: ValidationResult, key) => {
    if (typeof validateObject[key] === "function") {
      const { msg, result } = validateObject[key]!(trimedValue, identity);
      if (!result)
        validationResult.push({
          msg,
        });
    }
    return validationResult;
  }, []);
};
