import { FC, useContext, useEffect } from "react";
import { getValidationResult } from "../core";
import FormContext from "../core/formContext";
import { TextareaProps, ValidaitonCombined } from "../types";

const Textarea: FC<TextareaProps> = ({
  validation,
  customValidation,
  identity,
  ...props
}) => {
  const context = useContext<ValidaitonCombined>(FormContext);

  useEffect(() => {
    if (validation || customValidation) {
      if (identity && typeof props.value !== "undefined") {
        const validationResult = getValidationResult(
          props.value!.toString(),
          identity,
          validation,
          customValidation
        );

        context?.validationState?.setValidationResults((state) => {
          state[identity] = validationResult;
          return state;
        });
      }
    }
  }, [props.value, identity, validation, customValidation, context]);

  return <textarea {...props} />;
};

export default Textarea;
