export const addLeadingZero = (num: number, places = 2) => {
  return num.toString().padStart(places, "0");
};

export const toCurrency = (num: number) => {
  return Number(num)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
