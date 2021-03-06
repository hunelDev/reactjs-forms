import { PrimaryValidateValue, ValidationResults } from "../types";

export const addPrimaryMsg = (validate: PrimaryValidateValue, msg: string) => {
  switch (typeof validate) {
    case "string":
    case "boolean":
    case "number":
      return msg;
    default:
      return validate.msg ?? msg;
  }
};

export const getValue = (validate?: PrimaryValidateValue) => {
  switch (typeof validate) {
    case "string":
    case "boolean":
    case "number":
      return validate;
    default:
      return validate?.value ?? "";
  }
};

export const resolveMsg = (
  msg: string,
  identity: string,
  value?: string | number | boolean
) => {
  const preResolve = msg.replace(/{{identity}}/, identity);
  if (!value) return preResolve;
  return preResolve.replace(/{{value}}/, value.toString());
};

export const checkResultIsValid = (result: ValidationResults) => {
  return !Object.keys(result).some((v) => result[v].length > 0);
};
