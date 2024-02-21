export const randomizeArray = (array) => {
  if (isValidArray(array)) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  } else return [];
};

export const isValidArray = (data) => {
  return data && Array.isArray(data) && data.length > 0;
};
