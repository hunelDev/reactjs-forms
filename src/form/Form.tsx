import { FC, FormEventHandler, useContext } from "react";
import FormContext from "../core/formContext";
import { ExtendedHTMLFormElement, FormProps } from "../types";

const Form: FC<FormProps> = ({ children, onSubmit, ...props }) => {
  const context = useContext(FormContext);

  const submitHandler: FormEventHandler<ExtendedHTMLFormElement> = (e) => {
    e.currentTarget.validation = context!.validationResults;
    if (onSubmit) onSubmit(e);
  };

  return (
    <form {...props} onSubmit={submitHandler}>
      {children}
    </form>
  );
};

export default Form;
