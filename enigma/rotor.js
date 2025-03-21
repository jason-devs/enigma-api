import variables from "./variables.js";

class Rotor {
  #alphabet;
  #doubleStep = false;
  #rotation = 0;
  #position;
  #number;
  #key;
  #notch;
  nextRotor;

  constructor(position, key, ringPosition, startRotation) {
    this.#alphabet = variables.alphabet;
    this.#position = position;
    this.#number = key;
    const keyString = `key${this.#number}`;
    const notchString = `notch${this.#number}`;
    this.#key =
      ringPosition === 0
        ? variables[keyString]
        : this.#setRingOffset(variables[keyString], ringPosition);
    if (startRotation > 0) {
      this.#key = this.#rotateArr(this.#key, startRotation);
      this.#alphabet = this.#rotateArr(this.#alphabet, startRotation);
      this.#rotation = startRotation;
    }
    this.#notch = variables[notchString];
  }

  encryptForward(index) {
    const leadRotor = this.#position === 0;
    const middleRotor = this.#position === 1;
    if (leadRotor) this.rotate();
    if (middleRotor && this.#doubleStep) {
      this.#rotateBoth();
      this.#doubleStep = false;
    }
    const notch = this.#rotation === this.#notch;
    if (leadRotor && notch) this.rotateNext();
    if (middleRotor && this.#rotation === this.#notch - 1) {
      this.#doubleStep = true;
    }

    const endIndex = this.#alphabet.indexOf(this.#key[index]);

    return endIndex;
  }

  encryptBackward(index) {
    const endIndex = this.#key.indexOf(this.#alphabet[index]);
    return endIndex;
  }

  rotate() {
    this.#key = this.#rotateArr(this.#key, 1);
    this.#alphabet = this.#rotateArr(this.#alphabet, 1);
    this.#rotation = (this.#rotation + 1) % 26;
  }

  rotateNext() {
    this.nextRotor.rotate();
  }

  #rotateBoth() {
    this.rotate();
    this.rotateNext();
  }

  #setRingOffset(key, offset) {
    const dot = this.#getIndex(key, "A") + offset;

    const shiftedKey = key
      .split("")
      .map(letter => {
        return variables.alphabet[
          (this.#getIndex(variables.alphabet, letter) + offset) % 26
        ];
      })
      .join("");

    const ringSettingLetter = variables.alphabet[offset];
    const ringSettingIndex = shiftedKey.indexOf(ringSettingLetter);
    const rotation = dot - ringSettingIndex;

    const finalKey =
      shiftedKey.slice(-rotation) + shiftedKey.slice(0, 26 - rotation);

    return finalKey;
  }

  #rotateArr(string, offset) {
    return string.slice(offset) + string.slice(0, offset);
  }

  #getIndex(string, letter) {
    return string.indexOf(letter);
  }
}

export default Rotor;
