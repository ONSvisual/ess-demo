import { base } from "$app/paths";

export const mapStyle = `${base}/data/mapstyle.json`;
export const mapBounds = [[-7.5722, 49.9600], [1.6815, 58.6350]];

export const geoFilter = ["E06", "E07", "E08", "E09", "N09", "S12", "W06"];

export const colors = {
  seq: ["rgb(234,236,177)", "rgb(169,216,145)", "rgb(0,167,186)", "rgb(0,78,166)", "rgb(0,13,84)"],
  biv: [['#bbbbbb', '#f66068'], ['#206095', '#362447']]
};

export const datasets = [
  {
    "code": "population",
    "label": "Population",
    "years": [2001, 2020],
    "unit": "people"
  },
  {
    "code": "density",
    "label": "Density",
    "years": [2001, 2020],
    "unit": "people per sq. km"
  },
  {
    "code": "age_median",
    "label": "Median age",
    "years": [2001, 2020],
    "unit": "years"
  },
  {
    "code": "gva_job",
    "label": "GVA per filled job",
    "years": [2002, 2020],
    "unit": "£"
  },
  {
    "code": "gdhi_person",
    "label": "GDHI per head",
    "years": [1997, 2020],
    "unit": "£"
  },
  {
    "code": "employment",
    "label": "Employment rate for 16 to 64 year olds",
    "years": [2006, 2021],
    "unit": "%"
  },
  {
    "code": "life_exp_f",
    "label": "Female life expectancy",
    "years": [2003, 2018],
    "unit": "years"
  }
];