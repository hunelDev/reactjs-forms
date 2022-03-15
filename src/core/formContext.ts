import { createContext } from "react";
import { ValidationState } from "../types";

const FormContext = createContext<ValidationState>(null);
FormContext.displayName = "FormContext";
export default FormContext;
