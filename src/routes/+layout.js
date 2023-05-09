import { getTopo, getPlaces, getDataset } from "$lib/utils";
import { datasets } from "$lib/config";

export const prerender = true;
export const trailingSlash = "always";

export async function load({ fetch }) {
  const geojson = await getTopo(fetch);
  const places = await getPlaces(fetch);
  const lookup = {};
  places.forEach(p => lookup[p.areacd] = p);
  const data = {};
  let yrs = [];
  for (let dataset of datasets) {
    const dat = await getDataset(dataset, fetch);
    data[dataset.code] = dat;
    yrs = [...yrs, ...dat.years];
  }
  const years = Array.from(new Set(yrs)).sort((a, b) => a - b);
  return {data, geojson, places, lookup, years};
}