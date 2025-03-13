export const randomNumber = () => Math.floor(Math.random() * 26);

export const catchAsyncErrors = fn => (req, res, next) =>
  fn(req, res, next).catch(next);
