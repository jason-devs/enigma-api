import * as enigmaController from "./enigmaController.js";

const getDecryptedText = (req, res, next) => {
  const { cyphertext, settings } = req.body;

  const decrypted = enigmaController.decrypt(cyphertext, settings);

  res.status(200).json({
    status: "success",
    data: {
      decrypted,
      settings,
    },
  });
};

export default getDecryptedText;
