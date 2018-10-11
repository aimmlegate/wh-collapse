export const getProcent = (val, prc) => (val / 100) * prc;

export const stackPenalty = n => val =>
  val * Math.exp(-((parseInt(n, 10) / 2.67) ** 2));

export const decreaseOnProcentPenalty = (n, val, prc) =>
  val - stackPenalty(n, (val / 100) * prc);
