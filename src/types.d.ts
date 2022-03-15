import { Dispatch, SetStateAction } from "react";
import { ChangeEventHandler, FormEventHandler } from "react";

type ValidationResults = {
  [p: string]: {
    msg: string;
  }[];
};

type ValidationState = {
  validationResults: ValidationResults;
  setValidationResults: Dispatch<SetStateAction<ValidationResults>>;
} | null;

interface ExtendedHTMLFormElement extends HTMLFormElement {
  onSubmit?: FormEventHandler<ExtendedHTMLFormElement>;
  validation: ValidationResults;
}

interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<ExtendedHTMLFormElement>,
    ExtendedHTMLFormElement
  > {
  onSubmit?: FormEventHandler<ExtendedHTMLFormElement>;
}

interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    Validatable {}

interface ExtendedHTMLSelectElement extends HTMLSelectElement {
  /**
   * Unlike Select Element value prop,values prop contains all of selected option values while mutliple attribute is true
   */
  values: string[];
  onChange?: ChangeEventHandler<ExtendedHTMLSelectElement>;
}

interface SelectProps
  extends React.DetailedHTMLProps<
      React.SelectHTMLAttributes<ExtendedHTMLSelectElement>,
      ExtendedHTMLSelectElement
    >,
    Validatable {}

declare interface TextareaProps
  extends React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    Validatable {}

type PrimaryValidation =
  | "isEmail"
  | "isAlpha"
  | "isUnicode"
  | "isName"
  | "isNumeric"
  | "isAlphaNumeric"
  | "isUnicodeNumeric"
  | "required"
  | "maxLen"
  | "minLen"
  | "max"
  | "min";

type ValidationResult = {
  msg: string;
}[];

type PrimaryValidateValue =
  | {
      msg?: string;
      value?: number | string | boolean;
    }
  | string
  | boolean
  | number;

type PrimaryValidateObject = {
  [P in PrimaryValidation]?: PrimaryValidateValue;
};

type CustomValidationResult = {
  result: boolean;
  msg: string;
};

type CustomValidate = {
  [P: string]: (
    value: string | string[],
    identity: string
  ) => CustomValidationResult;
};

type CustomValidateObject = Partial<CustomValidate>;

interface Validatable {
  validation?: PrimaryValidateObject;
  customValidation?: CustomValidateObject;
  identity?: string;
}

type ValidateCase = {
  case: keyof PrimaryValidateObject;
  pattern: {
    is?: RegExp | string;
    not?: RegExp | string;
    len?: {
      lower?: true;
      greater?: true;
    };
    num?: {
      lower?: true;
      greater?: true;
    };
  };
  defaultMsg: string;
};
