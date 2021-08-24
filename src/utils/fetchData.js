const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const key = "d3beaab45f7d87888ac713c439d7e7e2";

export const getData = async (query) => {
  const res = await fetch(`${baseUrl}q=${query}&appid=${key}`);

  const data = res.json();
  return data;
};
