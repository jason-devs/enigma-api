import variables from "./variables.js";

class Reflector {
  #alphabet;
  #key;
  constructor(key) {
    const keyString = `ref${key}`;
    this.#alphabet = variables.alphabet;
    this.#key = variables[keyString];
  }

  reflect(index) {
    const endIndex = this.#getIndex(this.#alphabet, this.#key[index]);
    return endIndex;
  }

  #getIndex(string, letter) {
    return string.indexOf(letter);
  }
}

export default Reflector;
