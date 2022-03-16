import { addPrimaryMsg, getValue, resolveMsg } from "./helper";
import ValidatePipeLine from "./pipeline";
import {
  PrimaryValidateObject,
  PrimaryValidateValue,
  ValidateCase,
  ValidationResult,
} from "../types";

export const checkForPrimaryValidation = (
  validateObject: PrimaryValidateObject,
  value: string | readonly string[] | number,
  identity: string
) => {
  const validateKeys = Object.keys(validateObject);

  const trimedValue = Array.isArray(value)
    ? value.map((val) => val.trim())
    : value.toString().trim();

  //required checking is seperated from other validation pipes becuase of required checking is a result breaker so is should be work first
  //todo breaker system in pipe
  if (validateKeys.find((key) => key === "required")) {
    if (Array.isArray(trimedValue)) {
      if (trimedValue.length < 1 || !trimedValue.some((v) => !!v)) {
        return [
          {
            msg: addPrimaryMsg(
              validateObject["required"]!,
              `${identity} field value is required`
            ),
          },
        ];
      }
    }

    if (trimedValue === "" || !trimedValue)
      return [
        {
          msg: addPrimaryMsg(
            validateObject["required"]!,
            `${identity} field value is required`
          ),
        },
      ];
  }

  return validateReducer(
    ValidatePipeLine,
    identity,
    trimedValue,
    validateObject
  );
};

const validateReducer = (
  validateCases: ValidateCase[],
  identity: string,
  value: string | string[],
  validateObject: PrimaryValidateObject
) => {
  const validateKeys = Object.keys(validateObject);

  return validateKeys.reduce((validationResult: ValidationResult, key) => {
    const validate = validateObject[key as keyof PrimaryValidateObject]!;
    const validateCase = validateCases.find((v) => v.case === key) as
      | ValidateCase
      | undefined;

    if (validateCase)
      return ResolveValidateCase(
        validationResult,
        validateCase,
        validate
      )(value, identity);

    return validationResult;
  }, []);
};

const ResolveValidateCase = (
  validationResult: ValidationResult,
  validateCase: ValidateCase,
  validate: PrimaryValidateValue
) => {
  const { pattern, defaultMsg } = validateCase;
  return (value: string | string[], identity: string) => {
    let result: boolean = true;
    if (!pattern) return validationResult;

    const msgValue = getValue(validate);

    if (pattern.is || pattern.not) {
      if (Array.isArray(value)) {
        result = value.every((v) => {
          if (pattern.is?.regex || pattern.not?.regex) {
            return pattern.is?.regex
              ? new RegExp(pattern.is.regex.value, pattern.is.regex.flag).test(
                  v
                )
              : !new RegExp(
                  pattern.not!.regex!.value,
                  pattern.not!.regex!.flag
                ).test(v);
          }

          return pattern.is?.value
            ? pattern.is.value === v
            : pattern.not?.value !== v;
        });
      } else {
        if (pattern.is?.regex || pattern.not?.regex) {
          result = pattern.is?.regex
            ? new RegExp(pattern.is.regex.value, pattern.is.regex.flag).test(
                value
              )
            : !new RegExp(
                pattern.not!.regex!.value,
                pattern.not!.regex!.flag
              ).test(value);
        } else {
          result = pattern.is?.value
            ? pattern.is.value === value
            : pattern.not?.value !== value;
        }
      }
    }

    if (pattern.len || pattern.num) {
      if (Array.isArray(value)) {
        result = value.every((v) => {
          if (pattern.len)
            return pattern.len.greater
              ? v.length > +msgValue!
              : v.length < +msgValue!;

          return pattern.num!.greater ? +v > +msgValue! : +v < +msgValue!;
        });
      } else {
        if (pattern.len) {
          result = pattern.len.greater
            ? value.length < +msgValue!
            : value.length > +msgValue!;
        } else {
          result = pattern.num!.greater
            ? +value < +msgValue!
            : +value > +msgValue!;
        }
      }
    }

    if (!result)
      validationResult.push({
        msg: addPrimaryMsg(
          validate,
          resolveMsg(defaultMsg, identity, msgValue)
        ),
      });
    return validationResult;
  };
};
