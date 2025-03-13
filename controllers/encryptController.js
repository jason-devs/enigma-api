import * as enigmaController from "./enigmaController.js";

const getEncryptedText = (req, res, next) => {
  const { plaintext, settings } = req.body;
  const normalizedPlaintext = plaintext
    .split("")
    .filter(char => char !== " ")
    .join("");

  const encrypted = enigmaController.encrypt(normalizedPlaintext, settings);

  res.status(200).json({
    status: "success",
    data: {
      encrypted,
      settings,
    },
  });
};

export default getEncryptedText;
