import { FC, useMemo, useState } from "react";
import { useFormValidation } from "./core";
import { Form, Input } from "./form";
import { ValidationResult } from "./types";

const Tester: FC = () => {
  const [errorList, setErrorList] = useState<ValidationResult>([]);
  const [testInput, setTestInput] = useState("");

  const validation = useFormValidation();

  const errorListItems = useMemo(
    () => errorList.map((v, i) => <li key={i}>{v.msg}</li>),
    [errorList]
  );

  return (
    <div>
      <ul data-testid="errorList">{errorListItems}</ul>
      <Form
        data-testid="form"
        onSubmit={(e) => {
          e.preventDefault();
          setErrorList(validation("testInput").result.testInput);
        }}
      >
        <Input
          validation={{
            isEmail: true,
            isAlpha: {
              msg: "bro this value must contain letters!",
            },
          }}
          identity="testInput"
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
          data-testid="tester"
        />
      </Form>
    </div>
  );
};

export default Tester;
