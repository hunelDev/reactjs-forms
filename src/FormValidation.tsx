import { FC, useState } from "react";
import FormContext from "./core/formContext";
import { ValidationResults } from "./types";

const FormValidation: FC = ({ children }) => {
  const [validationResults, setValidationResults] = useState<ValidationResults>(
    {}
  );
  return (
    <FormContext.Provider value={{ validationResults, setValidationResults }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormValidation;
