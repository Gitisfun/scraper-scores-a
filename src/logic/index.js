export const withoutDay = (text) => {
  if (text.includes("maandag")) return text.replace("maandag", "").trim();
  return text.replace("zaterdag", "").trim();
};

export const reverseText = (text) => {
  return text.split("").reverse().join("");
};

export const withoutJibberish = (text, removedText) => {
  return text.replace(removedText, "").trim();
};

export const withoutLeague = (text) => {
  return text.replace("Klassement", "").trim();
};

export const getHomeScore = (score) => {
  let temp = score.substr(0, score.indexOf("-")).trim();
  return temp.replace(/\D/g, "");
};

export const getAwayScore = (score) => {
  let temp = score.substr(score.indexOf("-") + 1).trim();
  return temp.replace(/\D/g, "");
};

export const formatTime = (time) => {
  if (time.includes(".")) return time.replace(".", ":");
  return time;
};

export const removeSubstring = (text, search) => {
  return text.replace(search, "").trim();
};

export const cleanScoreRoundTitle = (text) => {
  return text.replace("expand_moreSpeeldag", "").trim();
};
