import * as helpers from "../utils/helpers.js";

export function encrypt(plaintext, settings) {
  //prettier-ignore
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  console.log({ settings });
  const output = Array.from({ length: plaintext.length }, () =>
    alphabet[helpers.randomNumber()].toUpperCase(),
  ).join("");
  return output;
}

export function decrypt(cyphertext, settings) {
  console.log(cyphertext);
  console.log(settings);
  return "This is what was said.";
}
