import { FC, FormEventHandler, useContext } from "react";
import FormContext from "../core/formContext";
import {
  ExtendedHTMLFormElement,
  FormProps,
  ValidaitonCombined,
} from "../types";

const Form: FC<FormProps> = ({ children, onSubmit, ...props }) => {
  const context = useContext<ValidaitonCombined>(FormContext);

  const submitHandler: FormEventHandler<ExtendedHTMLFormElement> = (e) => {
    e.currentTarget.validation = context?.validationState?.validationResults!;
    if (onSubmit) onSubmit(e);
  };

  return (
    <form {...props} onSubmit={submitHandler}>
      {children}
    </form>
  );
};

export default Form;
