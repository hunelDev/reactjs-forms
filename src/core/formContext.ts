import { createContext } from "react";
import { ValidaitonCombined } from "../types";

const FormContext = createContext<ValidaitonCombined>({
  validationState: null,
});
FormContext.displayName = "FormContext";
export default FormContext;
