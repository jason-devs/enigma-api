import variables from "./variables.js";
import Rotor from "./rotor.js";
import Reflector from "./reflector.js";
import Plugboard from "./plugboard.js";

class Enigma {
  #settings;
  #rotors;
  #reflector;
  #plugboard;

  constructor(settings) {
    this.#settings = settings;

    this.#rotors = settings.rotors.map(
      (rotorNum, i) =>
        new Rotor(
          i,
          rotorNum,
          settings.ringPositions[i],
          settings.startRotations[i],
        ),
    );

    this.#rotors.forEach((rotor, i) => {
      if (i === 2) return;
      rotor.nextRotor = this.#rotors[i + 1];
    });
    this.#reflector = new Reflector(settings.reflector);
    this.#plugboard = new Plugboard(settings.plugboard);
  }

  encrypt(letter) {
    let index = variables.alphabet.indexOf(letter);

    index = this.#plugboard.encrypt(index);

    const rotorsForward = this.#rotors.map(rotor => {
      index = rotor.encryptForward(index);
      return index;
    });

    index = rotorsForward.at(-1);

    index = this.#reflector.reflect(index);

    const rotorsBackward = this.#rotors.toReversed().map(rotor => {
      index = rotor.encryptBackward(index);
      return index;
    });

    index = rotorsBackward.at(-1);

    index = this.#plugboard.encrypt(index);

    return variables.alphabet[index];
  }
}

export default Enigma;
