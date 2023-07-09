export const LEAGUES_ORDER = ["EERSTE AFDELING", "TWEEDE AFDELING A", "TWEEDE AFDELING B", "TWEEDE AFDELING C", "DERDE AFDELING A", "DERDE AFDELING B", "DERDE AFDELING C", "VIERDE AFDELING A", "VIERDE AFDELING B", "VIERDE AFDELING C"];

export const LEAGUES_MAP = (league) => {
  switch (league) {
    case "1":
      return LEAGUES_ORDER[0];
    case "2A":
      return LEAGUES_ORDER[1];
    case "2B":
      return LEAGUES_ORDER[2];
    case "2C":
      return LEAGUES_ORDER[3];
    case "3A":
      return LEAGUES_ORDER[4];
    case "3B":
      return LEAGUES_ORDER[5];
    case "3C":
      return LEAGUES_ORDER[6];
    case "4A":
      return LEAGUES_ORDER[7];
    case "4B":
      return LEAGUES_ORDER[8];
    case "4C":
      return LEAGUES_ORDER[9];
    default:
      return "";
  }
};
