import Settings from "../enigma/settings.js";
import Enigma from "../enigma/enigma.js";

const getOutput = (text, settings) => {
  const enigma = new Enigma(settings);

  const output = text
    .split("")
    .map(letter => enigma.encrypt(letter))
    .join("");

  return output;
};

// eslint-disable-next-line import/prefer-default-export
export const sendOutput = (req, res, next) => {
  const { text } = req.body;
  const { rotors, reflector, plugboard, ringPositions, startRotations } =
    req.body.settings;

  const settings = new Settings(
    rotors,
    reflector,
    plugboard,
    ringPositions,
    startRotations,
  );

  const output = getOutput(text, settings);

  res.status(200).json({
    status: "success",
    data: {
      output,
      settings,
    },
  });
};
