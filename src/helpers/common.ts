export const addLeadingZero = (num: number, places = 2) => {
  return num.toString().padStart(places, "0");
};

export const toCurrency = (num: number) => {
  return Number(num)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const formatCurrencyWithPlaces = (number = 0, place = 2) => {
  if (number === 0) return "-- --";
  let val = number.toFixed(place);
  const arr = val.split(".");
  arr[0] = arr[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return arr.join(".");
};

export const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const currencyToNumber = (val: string) => {
  return Number(val.replace(/,/g, ""));
};
