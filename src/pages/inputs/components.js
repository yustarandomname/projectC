import email from "./Email.svelte";
import text from "./Text.svelte";

let defaultComponent = {
  src: text,
  raised: false,
  isValid: false,
  noPadding: false,
  testValid: _ => true,
  fullWidth: false,
  autoComplete: "off",
  value: ""
};

export let components = (type) => {
  switch (type) {
    case "email":
      const emailComponent = {
        src: email,
        testValid: (input) => {
          return input.match(
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
          ) != null
        }
      }
      return { ...defaultComponent, ...emailComponent };
    default:
      return defaultComponent;
  }
}