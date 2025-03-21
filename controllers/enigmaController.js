import Settings from "../enigma/settings.js";
import Enigma from "../enigma/enigma.js";
import AppError from "../utils/appError.js";

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

  if (!text) {
    return next(
      new AppError(
        `Cannot encrypt or decrypt an empty message! Please provide some text.`,
        400,
      ),
    );
  }

  if (text.length > 1000) {
    return next(
      new AppError(
        `This message exceeds the 1000 character limit. Please shorten!`,
        400,
      ),
    );
  }

  if (
    !rotors ||
    !reflector ||
    !plugboard ||
    !ringPositions ||
    !startRotations
  ) {
    return next(
      new AppError(
        `Cannot encrypt or decrypt a message without the full settings. Please make sure you've provided the rotors, reflector, plugboard, ring positions, and start rotations`,
        400,
      ),
    );
  }

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
