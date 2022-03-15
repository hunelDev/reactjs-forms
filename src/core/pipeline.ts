import { ValidateCase } from "../types";

const ValidatePipeLine: ValidateCase[] = [
  {
    case: "isEmail",
    pattern: {
      is: /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i,
    },
    defaultMsg: "invalid email address",
  },

  {
    case: "isAlpha",
    pattern: {
      is: /\p{L}+/iu,
    },
    defaultMsg: "{{identity}} field value must contain only letters.",
  },

  {
    case: "isNumeric",
    pattern: {
      is: /^[0-9]+$/iu,
    },
    defaultMsg: "{{identity}} field value must contain only numbers",
  },

  {
    case: "isAlphaNumeric",
    pattern: {
      is: /^[\p{L} | 0-9]+$/iu,
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
    defaultMsg: "{{identity}} field value must be lower than {{value}}.",
  },
  {
    case: "min",
    pattern: {
      num: {
        greater: true,
      },
    },
    defaultMsg: "{{identity}} field value must be greater than {{value}}.",
  },
];

export default ValidatePipeLine;
