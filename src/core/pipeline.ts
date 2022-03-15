import { ValidateCase } from "../types";

const ValidatePipeLine: ValidateCase[] = [
  {
    case: "isEmail",
    pattern: {
      is: /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/gim,
    },
    defaultMsg: "invalid email address",
  },

  {
    case: "isAlpha",
    pattern: {
      is: /^[a-z]+$/gim,
    },
    defaultMsg: "{{identity}} field value must contain only letters.",
  },

  {
    case: "isUnicode",
    pattern: {
      is: /^\p{L}+$/gimu,
    },
    defaultMsg: "{{identity}} field value must contain only letters.",
  },

  {
    case: "isName",
    pattern: {
      is: /^[\p{L}`'~.\s]{2,}$/gimu,
    },
    defaultMsg: "invalid name",
  },

  {
    case: "isNumeric",
    pattern: {
      is: /^[0-9]+$/gim,
    },
    defaultMsg: "{{identity}} field value must contain only numbers",
  },
  {
    case: "isAlphaNumeric",
    pattern: {
      is: /^[a-z | 0-9]+$/gimu,
    },
    defaultMsg: "{{identity}} field value must contain letters and numbers.",
  },

  {
    case: "isUnicodeNumeric",
    pattern: {
      is: /^[\p{L} | 0-9]+$/gimu,
    },
    defaultMsg: "{{identity}} field value must contain letters and numbers.",
  },

  {
    case: "maxLen",
    pattern: {
      len: {
        greater: true,
      },
    },
    defaultMsg:
      "{{identity}} field value must be maximum {{value}} characters.",
  },
  {
    case: "minLen",
    pattern: {
      len: {
        lower: true,
      },
    },
    defaultMsg:
      "{{identity}} field value must be minimum {{value}} characters.",
  },
  {
    case: "min",
    pattern: {
      num: {
        lower: true,
      },
    },
    defaultMsg: "{{identity}} field value must be greater than {{value}}.",
  },
  {
    case: "max",
    pattern: {
      num: {
        greater: true,
      },
    },
    defaultMsg: "{{identity}} field value must be lower than {{value}}.",
  },
];

export default ValidatePipeLine;
