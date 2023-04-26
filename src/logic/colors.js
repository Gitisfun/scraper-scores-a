class Colors {
  static BLACK = "#000000";
  static WHITE = "#F5F6FA";
  static BLUE = "#0000FF";
  static RED = "#FF0000";
  static YELLOW = "#FFFF00";
  static GREEN = "#008000";
  static GREY = "#808080";
  static ORANGE = "#FFA500";
  static PURPLE = "#800080";
  static SALMON = "#FA8072";
  static TURQUOISE = "#40E0D0";
  static BORDEAUX = "#4C0013";

  static LIGHT_BLUE = "#ADD8E6";

  static DARK_ORANGE = "#FF8C00";
  static DARK_BLUE = "#0008B";
  static DARK_GREY = "#A9A9A9";
  static DARK_GREEN = "#006400";

  static getColors(list, code) {
    for (const color of list) {
      if (color.code === code) {
        return {
          colors: color.colors,
          style: color.kit,
        };
      }
    }
    return [];
  }
}

export default Colors;
