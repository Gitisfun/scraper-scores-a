export const exists = ($, root, element) => {
  return $(root).find(element).length > 0;
};
