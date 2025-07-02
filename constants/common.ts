export const STORAGE_KEY = {
  EC_TOKEN: 'token',
  EC_USER: 'user',
}

export const REGEX = {
  email:
    /^(?!.*\.\.)(?!.*@.*@)(?!.*\.$)(?!.*\.\@)(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!;#$%&)(^:,.~*<>?-])[a-zA-Z0-9@!;#$%&)(^:,.~*<>?-]{1,20}$/,
  phoneNumber: /^(0|\+84)(3[2-9]|5[6-9]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/,
  url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  IMAGE_TYPE: /^image\/(jpe?g|a?png)/i,
  ALPHABETS: /^[A-Za-z]+$/,
  ALPHABETS_AND_NUMBER: /^[A-Za-z0-9]+$/,
  NUMBER_WITH_COMMA_REGEX: /^(?![.,、。])([0-9０-９]+([.,、。][0-9０-９]*)?)?$/,
  NUMBER_REGEX: /^[0-9０-９]+$/,
};