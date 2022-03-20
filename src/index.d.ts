import { FC } from "react";
import {
  FormProps,
  FormValidationProps,
  InputProps,
  SelectProps,
  TextareaProps,
  ValidationResults,
} from "./types";

export declare const Form: FC<FormProps>;
export declare const Input: FC<InputProps>;
export declare const Select: FC<SelectProps>;
export declare const Textarea: FC<TextareaProps>;
export function useFormValidation<T extends ValidationResults>(): (
  ...ids: [string[]] | [...string[]]
) => { result: T; isValid: boolean };
export declare const FormValidation: FC<FormValidationProps>;
export default FormValidation;
