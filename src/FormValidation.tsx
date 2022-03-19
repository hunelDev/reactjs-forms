import { FC, useState } from "react";
import FormContext from "./core/formContext";
import { FormValidationProps, ValidationResults } from "./types";

const FormValidation: FC<FormValidationProps> = ({ children, config }) => {
  const [validationResults, setValidationResults] = useState<ValidationResults>(
    {}
  );
  return (
    <FormContext.Provider
      value={{
        config,
        validationState: { validationResults, setValidationResults },
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormValidation;
