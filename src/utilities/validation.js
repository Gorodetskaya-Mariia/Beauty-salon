export const required = (value) =>
  value || typeof value === "number" ? undefined : "Required";

export const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength3 = minLength(3);

export const minLength6 = minLength(6);

export const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength15 = maxLength(15);

export const alpha = (value) =>
  value && !/^([а-яё\s]+|[a-z\s]+)$/iu.test(value)
    ? "Only alphanumeric characters"
    : undefined;

export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const phoneNumber = (value) =>
  value && !/^(0|[1-9][0-9]{10})$/i.test(value)
    ? "Invalid phone number, must be 11 digits"
    : undefined;

export const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;
