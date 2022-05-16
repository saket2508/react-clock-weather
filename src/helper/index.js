const API = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/weather",
  search:"https://api.openweathermap.org/geo/1.0/direct"
};

export async function getWeatherFromCoordinates(lat, lon, unit = "metric") {
  try {
    const res = await fetch(
      `${API.base}?lat=${lat}&lon=${lon}&appid=${API.key}&units=${unit}`
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Could not fetch data");
  }
}

export async function searchLocationAPI(query){
  try {
    const res = await fetch(
      `${API.search}?q=${query}&limit=${5}&appid=${API.key}`
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    throw new Error('could not get data');
  }
}

export function getGPSCoordinates() {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!pos) {
            resolve(undefined);
          }
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          resolve({
            lat,
            lon,
          });
        },
        (e) => {
          console.error(e);
          resolve(undefined);
        }
      );
    } else {
      resolve(undefined);
    }
  });
}

export const weatherConfig = {
  dust: {
    icon(){
      return <i className="fa-solid fa-smog"></i>;
    },
    bg(){
      document.body.setAttribute('class', 'haze');
    }
  },
  smoke: {
    icon(){
      return <i className="fa-solid fa-smog"></i>;
    },
    bg(){
      document.body.setAttribute('class', 'haze');
    }
  },
  haze: {
    icon(){
      return <i className="fa-solid fa-smog"></i>;
    },
    bg(){
      document.body.setAttribute('class', 'haze');
    }
  },
  drizzle: {
    icon(){
      return <i className="fa-solid fa-cloud-rain"></i>
    },
    bg(){
      document.body.setAttribute("class", "rain");
    }
  },
  rain: {
    icon(){
      return <i className="fa-solid fa-cloud-rain"></i>
    },
    bg(){
      document.body.setAttribute("class", "rain");
    }
  },
  thunderstorm: {
    icon(){
      return <i class="fa-solid fa-cloud-showers-water"></i>;
    },
    bg(){
      document.body.setAttribute("class", "thunderstorm");
    }
  },
  snow: {
    icon(){
      return <i className="fa-solid fa-cloud-snow"></i>;
    },
    bg(){
      document.body.setAttribute("class", "snow");
    }
  },
  clear:{
    day:{
      bg(){
        document.body.setAttribute("class", "clear");
      },
      icon(){
        return <i className="fa-solid fa-sun"></i>;
      }
    },
    night:{
      bg(){
        document.body.setAttribute("class", "clear-night");
      },
      icon(){
        return <i class="fa-solid fa-moon"></i>
      }
    }
  },
  clouds:{
    day:{
      bg(){
        document.body.setAttribute("class", "clouds");
      },
      icon(){
        return <i class="fa-solid fa-cloud-sun"></i>
      }
    },
    night:{
      bg(){
        document.body.setAttribute("class", "clouds-night");
      },
      icon(){
        return <i class="fa-solid fa-cloud-moon"></i>
      }
    }
  },
  mist:{
    icon(){
      return <i className="fa-solid fa-cloud"></i>;
    },
    day:{
      bg(){
        document.body.setAttribute("class", "mist");
      }
    },
    night:{
      bg(){
        document.body.setAttribute("class", "clouds-night");
      }
    }
  },
  fog:{
    icon(){
      return <i className="fa-solid fa-cloud"></i>;
    },
    day:{
      bg(){
        document.body.setAttribute("class", "mist");
      }
    },
    night:{
      bg(){
        document.body.setAttribute("class", "clouds-night");
      }
    }
  }
}

export const countryList = {
  "AF": "Afghanistan",
  "AL": "Albania",
  "DZ": "Algeria",
  "AS": "American Samoa",
  "AD": "Andorra",
  "AO": "Angola",
  "AI": "Anguilla",
  "AQ": "Antarctica",
  "AG": "Antigua and Barbuda",
  "AR": "Argentina",
  "AM": "Armenia",
  "AW": "Aruba",
  "AU": "Australia",
  "AT": "Austria",
  "AZ": "Azerbaijan",
  "BS": "Bahamas (the)",
  "BH": "Bahrain",
  "BD": "Bangladesh",
  "BB": "Barbados",
  "BY": "Belarus",
  "BE": "Belgium",
  "BZ": "Belize",
  "BJ": "Benin",
  "BM": "Bermuda",
  "BT": "Bhutan",
  "BO": "Bolivia",
  "BQ": "Bonaire, Sint Eustatius and Saba",
  "BA": "Bosnia and Herzegovina",
  "BW": "Botswana",
  "BV": "Bouvet Island",
  "BR": "Brazil",
  "IO": "British Indian Ocean Territory (the)",
  "BN": "Brunei Darussalam",
  "BG": "Bulgaria",
  "BF": "Burkina Faso",
  "BI": "Burundi",
  "CV": "Cabo Verde",
  "KH": "Cambodia",
  "CM": "Cameroon",
  "CA": "Canada",
  "KY": "Cayman Islands (the)",
  "CF": "Central African Republic (the)",
  "TD": "Chad",
  "CL": "Chile",
  "CN": "China",
  "CX": "Christmas Island",
  "CC": "Cocos (Keeling) Islands (the)",
  "CO": "Colombia",
  "KM": "Comoros (the)",
  "CD": "Congo (the Democratic Republic of the)",
  "CG": "Congo (the)",
  "CK": "Cook Islands (the)",
  "CR": "Costa Rica",
  "HR": "Croatia",
  "CU": "Cuba",
  "CW": "Curaçao",
  "CY": "Cyprus",
  "CZ": "Czechia",
  "CI": "Côte d'Ivoire",
  "DK": "Denmark",
  "DJ": "Djibouti",
  "DM": "Dominica",
  "DO": "Dominican Republic (the)",
  "EC": "Ecuador",
  "EG": "Egypt",
  "SV": "El Salvador",
  "GQ": "Equatorial Guinea",
  "ER": "Eritrea",
  "EE": "Estonia",
  "SZ": "Eswatini",
  "ET": "Ethiopia",
  "FK": "Falkland Islands (the) [Malvinas]",
  "FO": "Faroe Islands (the)",
  "FJ": "Fiji",
  "FI": "Finland",
  "FR": "France",
  "GF": "French Guiana",
  "PF": "French Polynesia",
  "TF": "French Southern Territories (the)",
  "GA": "Gabon",
  "GM": "Gambia (the)",
  "GE": "Georgia",
  "DE": "Germany",
  "GH": "Ghana",
  "GI": "Gibraltar",
  "GR": "Greece",
  "GL": "Greenland",
  "GD": "Grenada",
  "GP": "Guadeloupe",
  "GU": "Guam",
  "GT": "Guatemala",
  "GG": "Guernsey",
  "GN": "Guinea",
  "GW": "Guinea-Bissau",
  "GY": "Guyana",
  "HT": "Haiti",
  "HM": "Heard Island and McDonald Islands",
  "VA": "Holy See (the)",
  "HN": "Honduras",
  "HK": "Hong Kong",
  "HU": "Hungary",
  "IS": "Iceland",
  "IN": "India",
  "ID": "Indonesia",
  "IR": "Iran",
  "IQ": "Iraq",
  "IE": "Ireland",
  "IM": "Isle of Man",
  "IL": "Israel",
  "IT": "Italy",
  "JM": "Jamaica",
  "JP": "Japan",
  "JE": "Jersey",
  "JO": "Jordan",
  "KZ": "Kazakhstan",
  "KE": "Kenya",
  "KI": "Kiribati",
  "KP": "North Korea",
  "KR": "South Korea",
  "KW": "Kuwait",
  "KG": "Kyrgyzstan",
  "LA": "Laos",
  "LV": "Latvia",
  "LB": "Lebanon",
  "LS": "Lesotho",
  "LR": "Liberia",
  "LY": "Libya",
  "LI": "Liechtenstein",
  "LT": "Lithuania",
  "LU": "Luxembourg",
  "MO": "Macao",
  "MG": "Madagascar",
  "MW": "Malawi",
  "MY": "Malaysia",
  "MV": "Maldives",
  "ML": "Mali",
  "MT": "Malta",
  "MH": "Marshall Islands (the)",
  "MQ": "Martinique",
  "MR": "Mauritania",
  "MU": "Mauritius",
  "YT": "Mayotte",
  "MX": "Mexico",
  "FM": "Micronesia (Federated States of)",
  "MD": "Moldova (the Republic of)",
  "MC": "Monaco",
  "MN": "Mongolia",
  "ME": "Montenegro",
  "MS": "Montserrat",
  "MA": "Morocco",
  "MZ": "Mozambique",
  "MM": "Myanmar",
  "NA": "Namibia",
  "NR": "Nauru",
  "NP": "Nepal",
  "NL": "Netherlands",
  "NC": "New Caledonia",
  "NZ": "New Zealand",
  "NI": "Nicaragua",
  "NE": "Niger (the)",
  "NG": "Nigeria",
  "NU": "Niue",
  "NF": "Norfolk Island",
  "MP": "Northern Mariana Islands (the)",
  "NO": "Norway",
  "OM": "Oman",
  "PK": "Pakistan",
  "PW": "Palau",
  "PS": "Palestine, State of",
  "PA": "Panama",
  "PG": "Papua New Guinea",
  "PY": "Paraguay",
  "PE": "Peru",
  "PH": "Philippines",
  "PN": "Pitcairn",
  "PL": "Poland",
  "PT": "Portugal",
  "PR": "Puerto Rico",
  "QA": "Qatar",
  "MK": "Republic of North Macedonia",
  "RO": "Romania",
  "RU": "Russian Federation (the)",
  "RW": "Rwanda",
  "RE": "Réunion",
  "BL": "Saint Barthélemy",
  "SH": "Saint Helena, Ascension and Tristan da Cunha",
  "KN": "Saint Kitts and Nevis",
  "LC": "Saint Lucia",
  "MF": "Saint Martin (French part)",
  "PM": "Saint Pierre and Miquelon",
  "VC": "Saint Vincent and the Grenadines",
  "WS": "Samoa",
  "SM": "San Marino",
  "ST": "Sao Tome and Principe",
  "SA": "Saudi Arabia",
  "SN": "Senegal",
  "RS": "Serbia",
  "SC": "Seychelles",
  "SL": "Sierra Leone",
  "SG": "Singapore",
  "SX": "Sint Maarten (Dutch part)",
  "SK": "Slovakia",
  "SI": "Slovenia",
  "SB": "Solomon Islands",
  "SO": "Somalia",
  "ZA": "South Africa",
  "GS": "South Georgia and the South Sandwich Islands",
  "SS": "South Sudan",
  "ES": "Spain",
  "LK": "Sri Lanka",
  "SD": "Sudan (the)",
  "SR": "Suriname",
  "SJ": "Svalbard and Jan Mayen",
  "SE": "Sweden",
  "CH": "Switzerland",
  "SY": "Syrian Arab Republic",
  "TW": "Taiwan",
  "TJ": "Tajikistan",
  "TZ": "Tanzania, United Republic of",
  "TH": "Thailand",
  "TL": "Timor-Leste",
  "TG": "Togo",
  "TK": "Tokelau",
  "TO": "Tonga",
  "TT": "Trinidad and Tobago",
  "TN": "Tunisia",
  "TR": "Turkey",
  "TM": "Turkmenistan",
  "TC": "Turks and Caicos Islands (the)",
  "TV": "Tuvalu",
  "UG": "Uganda",
  "UA": "Ukraine",
  "AE": "UAE",
  "GB": "UK",
  "UM": "United States Minor Outlying Islands (the)",
  "US": "US",
  "UY": "Uruguay",
  "UZ": "Uzbekistan",
  "VU": "Vanuatu",
  "VE": "Venezuela (Bolivarian Republic of)",
  "VN": "Viet Nam",
  "VG": "Virgin Islands (British)",
  "VI": "Virgin Islands (U.S.)",
  "WF": "Wallis and Futuna",
  "EH": "Western Sahara",
  "YE": "Yemen",
  "ZM": "Zambia",
  "ZW": "Zimbabwe",
  "AX": "Åland Islands"
};