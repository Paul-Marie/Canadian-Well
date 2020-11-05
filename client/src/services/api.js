import { get } from "./fetcher";

export const fetchAllTemperatures = () => {
  return get(`/temperatures`);
};

export const fetchCurrentTemperature = () => {
  return get(`/current`);
};
