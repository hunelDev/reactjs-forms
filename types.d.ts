import { Dispatch, SetStateAction, ReactNode, ChangeEventHandler, FormEventHandler } from "react";

type ValidationResults = {
  [p: string]: ValidationResult;
};

type ValidationState = {
  validationResults: ValidationResults;
  setValidationResults: Dispatch<SetStateAction<ValidationResults>>;
} | null;

type PrimaryCustomMessages = {
  [P in PrimaryValidation]?: string;
};

type ValidationConfig = {
  customMessages?: PrimaryCustomMessages;
};

type ValidaitonCombined = {
  validationState: ValidationState;
  config?: ValidationConfig;
};

interface ExtendedHTMLFormElement extends HTMLFormElement {
  onSubmit?: FormEventHandler<ExtendedHTMLFormElement>;
  validation: ValidationResults;
}

type FormValidationProps = {
  config?: ValidationConfig;
  children?:ReactNode
};

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

type CustomValidator = (
  value: string | string[],
  identity: string
) => CustomValidationResult;

type CustomValidate = {
  [P: string]: CustomValidator;
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
    is?: {
      regex?: {
        value: string;
        flag: string;
      };
      value?: string;
    };
    not?: {
      regex?: {
        value: string;
        flag: string;
      };
      value: string;
    };
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
