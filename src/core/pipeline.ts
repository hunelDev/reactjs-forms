import { ValidateCase } from "../types";
//'^(([^<>()[\\].,;:\\s@"]+(.[^<>()[\\].,;:\\s@"]+)*)|(".+"))@(([^<>()[\\].,;:\\s@"]+.)+[^<>()[\\].,;:\\s@"]{2,})$'
const ValidatePipeLine: ValidateCase[] = [
  {
    case: "isEmail",
    pattern: {
      is: {
        regex: {
          value:
            '^(([^<>()[\\].,;:\\s@"]+(.[^<>()[\\].,;:\\s@"]+)*)|(".+"))@(([^<>()[\\].,;:\\s@"]+.)+[^<>()[\\].,;:\\s@"]{2,})$',
          flag: "gim",
        },
      },
    },
    defaultMsg: "invalid email address",
  },

  {
    case: "isAlpha",
    pattern: {
      is: {
        regex: {
          value: "^[a-z]+$",
          flag: "gim",
        },
      },
    },
    defaultMsg: "{{identity}} field value must contain only letters.",
  },

  {
    case: "isUnicode",
    pattern: {
      is: {
        regex: {
          value: "^\\p{L}+$",
          flag: "gimu",
        },
      },
    },
    defaultMsg: "{{identity}} field value must contain only letters.",
  },

  {
    case: "isName",
    pattern: {
      is: {
        regex: {
          value: "[\\p{L}`'~.\\s]{2,}$",
          flag: "gimu",
        },
      },
    },
    defaultMsg: "invalid name",
  },

  {
    case: "isNumeric",
    pattern: {
      is: {
        regex: {
          value: "^[0-9]+$",
          flag: "gim",
        },
      },
    },
    defaultMsg: "{{identity}} field value must contain only numbers",
  },
  {
    case: "isAlphaNumeric",
    pattern: {
      is: {
        regex: {
          value: "^[a-z | 0-9]+$",
          flag: "gim",
        },
      },
    },
    defaultMsg: "{{identity}} field value must contain letters and numbers.",
  },

  {
    case: "isUnicodeNumeric",
    pattern: {
      is: {
        regex: {
          value: "^[\\p{L} | 0-9]+$",
          flag: "gimu",
        },
      },
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
