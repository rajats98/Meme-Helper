const { default: memeTemplates } = require('./memeTemplates');

export const getRandomMemeTemplate = () => {
  const len = memeTemplates.length;
  const randomIndex = parseInt(Math.random() * len);
  return memeTemplates[randomIndex];
};
