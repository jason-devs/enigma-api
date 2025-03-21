import variables from "./variables.js";

class Plugboard {
  #pairs;
  constructor(pairs) {
    this.#pairs = pairs.map(pair => [
      variables.alphabet.indexOf(pair[0]),
      variables.alphabet.indexOf(pair[1]),
    ]);
  }

  encrypt(index) {
    const plugged = this.#findIndex(index);
    if (!plugged) return index;
    return this.#findSwap(index);
  }

  #findIndex(index) {
    return this.#pairs.some(pair => pair[0] === index || pair[1] === index);
  }

  #findSwap(index) {
    const pair = this.#pairs.find(pair => pair.includes(index));
    return pair[0] === index ? pair[1] : pair[0];
  }
}

export default Plugboard;
