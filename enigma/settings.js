class Settings {
  rotors;
  plugboard;
  ringPositions;
  startRotations;

  constructor(rotors, reflector, plugboard, ringPositions, startRotations) {
    this.rotors = rotors;
    this.reflector = reflector;
    this.plugboard = plugboard;
    this.ringPositions = ringPositions;
    this.startRotations = startRotations;
  }
}

export default Settings;
