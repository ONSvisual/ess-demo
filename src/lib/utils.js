// TO CALCULATE
// Index every value to UK
// Calculate % + abs/pp change for latest
// Wide => long for line charts

// FOR BIVARIATE
// Calculate colour per area

import { base } from "$app/paths";
import { csvParse, autoType } from "d3-dsv";
import ckmeans from "ckmeans";
import { feature } from "topojson-client";
import { geoFilter, colors } from "./config.js";

function getColor(val, breaks, clrs = colors.seq) {
  for (let i = 0; i < breaks.length - 1; i ++) {
    if (val < breaks[i + 1]) return clrs[i % clrs.length];
  }
  return clrs[(breaks.length - 2) % clrs.length];
}

export async function getDataset(dataset, fetch = window.fetch) {
  const years = (() => {
    const yrs = [];
    for (let i = dataset.years[0]; i <= dataset.years[dataset.years.length - 1]; i ++) {
      yrs.push(i);
    }
    return yrs;
  })();
  const res = await fetch(`${base}/data/${dataset.code}.csv`);
  const data = csvParse(await res.text(), autoType).sort((a, b) => a.areanm.localeCompare(b.areanm));
  data.forEach(d => {
    for (let i = 1; i < years.length; i ++) {
      d[`${years[i]}_change_abs`] = d[`${years[i]}`] - d[`${years[i - 1]}`];
      d[`${years[i]}_change_perc`] = (d[`${years[i]}_change_abs`] / d[`${years[i - 1]}`]) * 100;
    }
  });
  const uk = data.find(d => d.areacd = "K02000001");
  const places = data.filter(d => geoFilter.includes(d.areacd.slice(0, 3)));
  const breaks = {};
  years.forEach(y => {
    const year_vals = places.map(a => a[`${y}`]).sort((a, b) => a - b);
    breaks[`${y}`] = [...ckmeans(year_vals, 5), year_vals[year_vals.length - 1]];
  })
  places.forEach(a => {
    for (let i = 0; i < years.length; i ++) {
      a[`${years[i]}_ind`] = (a[`${years[i]}`] / uk[`${years[i]}`]) * 100;
      a[`${years[i]}_color`] = getColor(a[`${years[i]}`], breaks[`${years[i]}`]);
      if (i > 0) {
        a[`${years[i]}_change_abs_ind`] = (a[`${years[i]}_change_abs`] / uk[`${years[i]}_change_abs`]) * 100;
        a[`${years[i]}_change_perc_ind`] = (a[`${years[i]}_change_perc`] / uk[`${years[i]}_change_perc`]) * 100;
        a[`${years[i]}_biv_color`] = colors.biv[a[`${years[i]}_ind`] >= 100 ? 1 : 0][a[`${years[i]}_change_abs_ind`] >= 100 ? 1 : 0];
      }
    }
  });
  return {uk, places, breaks, years};
}

export async function getPlaces(fetch = window.fetch) {
  const res = await fetch(`${base}/data/places.csv`);
  return csvParse(await res.text(), autoType);
}

export async function getTopo(fetch = window.fetch) {
  const res = await fetch(`${base}/data/topo.json`);
  return feature(await res.json(), "LTLA");
}

export function getYear(state) {
  if (!state?.year) return null;
  const year = state.year < state.dataset.years[0] + 1 ? state.dataset.years[0] + 1 :
    state.year > state.dataset.years[state.dataset.years.length - 1] ? state.dataset.years[state.dataset.years.length - 1] :
    state.year;
  return year;
}

export function makeLongData(data, years) {
  const longData = [];
  data.forEach(d => {
    years.forEach(y => {
      longData.push({
        areacd: d.areacd,
        areanm: d.areanm,
        year: +y,
        val: d[`${y}`],
        ind: d[`${y}_ind`]
      });
    });
  });
  return longData;
}

export function sortData(data, key) {
	let dataNew = [...data];
	dataNew.sort((a, b) => ascending(a[key], b[key]));
	if (data.map(d => d[key]).toString() === dataNew.map(d => d[key]).toString()) {
		return dataNew.reverse();
	}
	return dataNew;
}

function ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

export function commas(num) {
	const parts = String(num).split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return parts.join('.');
}