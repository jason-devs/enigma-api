import { catchAsyncErrors } from "../utils/helpers.js";
import Settings from "../enigma/settings.js";
import Enigma from "../enigma/enigma.js";

const process = (text, settings) => {
  const enigma = new Enigma(settings);

  const output = text
    .split("")
    .map(letter => enigma.encrypt(letter))
    .join("");

  return output;
};

export const encrypt = (req, res, next) => {
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

  const output = process(text, settings);

  res.status(200).json({
    status: "success",
    data: {
      output,
      settings,
    },
  });
};

export function decrypt(cyphertext, settings) {
  console.log(cyphertext);
  console.log(settings);
  return "This is what was said.";
}
