import { ChangeEventHandler, FC, useContext, useEffect } from "react";
import { getValidationResult } from "../core";
import FormContext from "../core/formContext";
import {
  ExtendedHTMLSelectElement,
  SelectProps,
  ValidationState,
} from "../types";

const Select: FC<SelectProps> = ({
  validation,
  customValidation,
  identity,
  children,
  ...props
}) => {
  const context = useContext<ValidationState>(FormContext);

  useEffect(() => {
    if (validation || customValidation) {
      if (identity && typeof props.value !== "undefined") {
        const validationResult = getValidationResult(
          props.value! as any,
          identity,
          validation,
          customValidation
        );

        context!.setValidationResults((state) => {
          state[identity] = validationResult;
          return state;
        });
      }
    }
  }, [props.value, identity, validation, customValidation, context]);

  const onChange: ChangeEventHandler<ExtendedHTMLSelectElement> = (e) => {
    const values = [...e.target.selectedOptions].map((option) => option.value);
    e.target.values = values;
    if (props.onChange) props.onChange(e);
  };

  return (
    <select {...props} onChange={onChange}>
      {children}
    </select>
  );
};

export default Select;
