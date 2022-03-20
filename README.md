## Reactjs Forms

![](https://img.shields.io/github/v/release/huneljs/reactjs-forms)

[**Github**](https://github.com/huneljs/reactjs-forms "Github")

[**Demo**](https://codesandbox.io/s/serene-paper-n3f013 "Demo")

[**Discord**](https://discord.gg/BQffnte8 "Join Discord")

- [Reactjs Forms](#reactjs-forms)
- [Installation](#nstallation)
- [Guide](#guide)
  - [Extended Features](#extended-features)
  - [Primary Validations](#primary-validations)
  - [Custom Validations](#custom-validations)
  - [Extended Form Element and Multiple Select Element](#extended-form-element-and-multiple-select-element)
  - [Examples](#examples)
  - [Initialization With Custom Messages](#initialization-with-custom-messages)
    - [Custom Message Priorities](#custom-message-priorities)

## Installation

`$ npm install reactjs-forms`

## Guide

reactjs-forms is a React package that contains a few React components and hook system. The components are almost the same as React syntactic form elements.So you may use all attributes which you can use them on syntactic form elements.

### Extended Features

reactjs-forms contains Input,Select and Textarea components.that components have validation,customValidation,identity props.Validation prop is a PrimaryValidateObject typed object prop.Validation accepts an object which contains primary validations.(buit-in validations).CustomValidation accepts a function is that returns object.That object has msg and result props.Msg is used to send a msg to ValidationResultObject whenever custom validation result is false.

### Primary Validations

| descriptor       | is value forced | explanation                                        |
| ---------------- | --------------- | -------------------------------------------------- |
| required         | No              | value cannot be empty or undefined                 |
| isEmail          | No              | value must be email address format                 |
| isAlpha          | No              | value must contain letters                         |
| isUnicode        | No              | value must contain unicode letters                 |
| isName           | No              | value must be name format                          |
| isNumeric        | No              | value can be numbers                               |
| isAlphaNumeric   | No              | value must contain letters and numbers             |
| isUnicodeNumeric | No              | value must contain unicode letters and numbers     |
| maxLen           | Yes             | value must contain fewer characters than {{value}} |
| minLen           | Yes             | value must contain more characters than {{value}}  |
| max              | Yes             | value must be numeric that lower than {{value}}    |
| min              | Yes             | value must be numeric that greater than {{value}}  |

_Primary validations are under development.You can help me to declare new features so you can be collaborator.Additionally you can access primary validation list under core/pipelines.ts_

### Custom Validations

You may declare custom validations.Custom validations accpet function with 2 parameters value and identity and returns an object that has result and msg props.
we have given an example see **Example - 2**

### Extended Form Element and Multiple Select Element

- Form element has validation results in submit handler via **e.currentTarget.validation**
- Primitive React Syntactic select elements cannot set values as array.You have to make an effort to get all selected options from HTMLSelectAttibutes but you don't need it when using reactjs-forms Select Component.So you can access all selected option values via **e.target.values** see **Example - 2**

### Examples

we have to wrap React compoents with FormValidation Component that contains base context provider

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FormValidation from "reactjs-forms";

ReactDOM.render(
  <FormValidation>
    <App />
  </FormValidation>,
  document.getElementById("root")
);
```

Or if you develope under NextJS;
_\_app.jsx;_

```jsx
import type { AppProps } from "next/app";
import FormValidation from "reactjs-forms";

function MyApp({ Component, pageProps }) {
  return (
    <FormValidation>
      <Component {...pageProps} />
    </FormValidation>
  );
}

export default MyApp;
```

##### Example - 1

_any component;_

```jsx
import { useMemo, useState } from "react";
import { Form, Input, Textarea, useFormValidation } from "reactjs-forms";

const App = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [addressErrors, setAddressErrors] = useState({});

  const validation = useFormValidation();

  const emailErrors = useMemo(
    () =>
      errors.email ? errors.email.map((v, i) => <li key={i}>{v.msg}</li>) : [],
    [errors]
  );

  const nameErrors = useMemo(
    () =>
      errors.name ? errors.name.map((v, i) => <li key={i}>{v.msg}</li>) : [],
    [errors]
  );

  const ageErrors = useMemo(
    () =>
      errors.age ? errors.age.map((v, i) => <li key={i}>{v.msg}</li>) : [],
    [errors]
  );

  const onlyAddressErrors = useMemo(
    () =>
      addressErrors.address
        ? addressErrors.address.map((v, i) => <li key={i}>{v.msg}</li>)
        : [],
    [addressErrors]
  );

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.currentTarget.validation); //we have accessed to the validation results via submit event currentTarget
          setErrors(validation().result); //get validation errors and set errors state for rendering
        }}
      >
        <label htmlFor="email">Email:</label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email} //we have to declare value attribute
          identity="email" //also we have to declare identity attribute because of that value is used to get validation results
          id="email" //
          type="email"
          validation={{
            required: true,
            isEmail: true,
          }}
        />
        {/* list all email erros*/}
        <ul>{emailErrors}</ul>
        <br />
        <label htmlFor="name">Name:</label>
        <Input
          onChange={(e) => setName(e.target.value)}
          value={name}
          identity="name"
          id="name"
          validation={{
            isName: {
              msg: "custom message", //you may or not declare a custom message
              value: true, //you dont have to declare value also
            },
          }}
        />
        {/* list all name erros*/}
        <ul>{nameErrors}</ul>
        <br />
        <label htmlFor="age">Age:</label>
        <Input
          onChange={(e) => setAge(e.target.value)}
          value={age}
          identity="age"
          id="age"
          validation={{
            isNumeric: true,
            min: 17, //you can assign value or msg like object notation
            max: {
              value: "120",
              msg: "What was that.holy lighten!!!!!",
            },
          }}
        />
        <ul>{ageErrors}</ul>
        <br />
        <label htmlFor="address">Address:</label>
        <br />
        <Textarea
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          identity="address"
          id="address"
          validation={{
            required: true,
            isUnicode: true,
          }}
          onBlur={() => {
            setAddressErrors(validation("address").result); //you may send args to get only specific inputs errors like ["adress","email"] or "address","email"
          }}
        />
        <ul>{onlyAddressErrors}</ul>
        <button>Send</button>
      </Form>
    </div>
  );
};

export default App;
```

##### Example - 2

In this example we will create a custom validator and also we will use a select form element with multiple selected attribute

```jsx
import { useMemo, useState } from "react";
import { Form, Input, Select, useFormValidation } from "reactjs-forms";

const Other = () => {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState({});

  const validation = useFormValidation();

  const passwordErrors = useMemo(
    () =>
      errors.password
        ? errors.password.map((v, i) => <li key={i}>{v.msg}</li>)
        : [],
    [errors]
  );

  const passwordRepeatErrors = useMemo(
    () =>
      errors.passwordRepeat
        ? errors.passwordRepeat.map((v, i) => <li key={i}>{v.msg}</li>)
        : [],
    [errors]
  );

  const jobsErrors = useMemo(
    () =>
      errors.jobs ? errors.jobs.map((v, i) => <li key={i}>{v.msg}</li>) : [],
    [errors]
  );

  //we have created a custom validator function
  function isEqulPasswords(password) {
    return function (value, identity) {
      return {
        msg: "passwords dont match",
        result: password === value,
      };
    };
  }

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setErrors(validation().result);
        }}
      >
        <label htmlFor="password">Password:</label>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          identity="password"
          id="password"
          validation={{
            required: true,
          }}
        />
        <br />
        <ul>{passwordErrors}</ul>
        <label htmlFor="password-repeat">Password-Repeat:</label>
        <Input
          onChange={(e) => setPasswordRepeat(e.target.value)}
          value={passwordRepeat}
          type="password"
          identity="passwordRepeat"
          id="passwordRepeat"
          validation={{
            required: true,
          }}
          customValidation={{
            isEqulPasswords: isEqulPasswords(password),
          }}
        />
        <br />
        <ul>{passwordRepeatErrors}</ul>
        <label htmlFor="name">Job:</label>
        <Select
          onChange={(e) => {
            setJobs(e.target.values); //we have accessed directly all the selected values and we have set jobs state
          }}
          identity="jobs"
          multiple
          value={jobs}
          validation={{
            isAlpha: true,
          }}
        >
          <option value="1">Fornt-end Developer</option>
          <option value="2">Back-end Developer</option>
          <option value="3">Pixel Artist</option>
          <option value="4">UX Designer</option>
        </Select>
        <ul>{jobsErrors}</ul>
        <button>Send</button>
      </Form>
    </div>
  );
};

export default Other;
```

### Initialization With Custom Messages

If you wish you can also send a config props to the FormValidation component while wrap your components with it.
So we can change FormValidation component like this;

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FormValidation from "reactjs-forms";

const config = {
  customMessages:{
    max:"{{identity}} can be maximum {{value}}",
    isEmai:"this email adress is invalid"
    :
  }
}
ReactDOM.render(
  <FormValidation config={config}>
    <App />
  </FormValidation>,
  document.getElementById("root")
);
```

in this _"{{identity}} can be maximum {{value}}"_ string expression; {{identity}} is your identity prop of Input,Textarea or Select components.
{{value}} is value that in validation prop of Input,Textarea or Select components.

```jsx
<Input
  onChange={(e) => setCost(e.target.value)}
  value={cost}
  identity="cost"
  validation={{
    max: 1000, // in this example {{value}} represents number 1000
  }}
/>
```

So _"{{identity}} can be maximum {{value}}"_ will be _"cost can be maximum 1000"_

#### Custom Message Priorities

Ofcourse custom messages has a priority while processing.
So custom message priority;

1. Form Element Component's validaiton msg props that you are declarated in components,
2. FormValidation Config's msg props,
3. Default msg props

in this list 1 has highest priority and 3 has lowest priority.

For ts examples; [**Demo**](https://codesandbox.io/s/serene-paper-n3f013 "Demo")

Finally,if you want to ask any question you can join our [Discord](https://discord.gg/BQffnte8 "Discord") channel.
Also you can be contributor.
