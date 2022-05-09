import axios from "axios";

export const instance = axios.create({
  timeout: 1000 * 15,
});
