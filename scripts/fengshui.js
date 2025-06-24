const chineseNewYearDates = {
  1962: "1962-02-05",
  1963: "1963-01-25",
  1964: "1964-02-13",
  1965: "1965-02-02",
  1966: "1966-01-21",
  1967: "1967-02-09",
  1968: "1968-01-30",
  1969: "1969-02-17",
  1970: "1970-02-06",
  1971: "1971-01-27",
  1972: "1972-02-15",
  1973: "1973-02-03",
  1974: "1974-01-23",
  1975: "1975-02-11",
  1976: "1976-01-31",
  1977: "1977-02-18",
  1978: "1978-02-07",
  1979: "1979-01-28",
  1980: "1980-02-16",
  1981: "1981-02-05",
  1982: "1982-01-25",
  1983: "1983-02-13",
  1984: "1984-02-02",
  1985: "1985-02-20",
  1986: "1986-02-09",
  1987: "1987-01-29",
  1988: "1988-02-17",
  1989: "1989-02-06",
  1990: "1990-01-27",
  1991: "1991-02-15",
  1992: "1992-02-04",
  1993: "1993-01-23",
  1994: "1994-02-10",
  1995: "1995-01-31",
  1996: "1996-02-19",
  1997: "1997-02-07",
  1998: "1998-01-28",
  1999: "1999-02-16",
  2000: "2000-02-05",
  2001: "2001-01-24",
  2002: "2002-02-12",
  2003: "2003-02-01",
  2004: "2004-01-22",
  2005: "2005-02-09",
  2006: "2006-01-29",
  2007: "2007-02-18",
  2008: "2008-02-07",
  2009: "2009-01-26",
  2010: "2010-02-14",
  2011: "2011-02-03",
  2012: "2012-01-23",
  2013: "2013-02-10",
  2014: "2014-01-31",
  2015: "2015-02-19",
  2016: "2016-02-08",
  2017: "2017-01-28",
  2018: "2018-02-16",
  2019: "2019-02-05",
  2020: "2020-01-25",
  2021: "2021-02-12",
  2022: "2022-02-01",
  2023: "2023-01-22",
  2024: "2024-02-10",
};

function getAdjustedChineseYear(year, month, day) {
  const birthDate = new Date(year, month - 1, day);
  const cny = chineseNewYearDates[year];
  if (!cny) return year; // fallback
  const newYearDate = new Date(cny);
  return birthDate < newYearDate ? year - 1 : year;
}

function calculateFengShuiProfile() {
  const birthYear = parseInt(document.getElementById("birthYear").value);
  const birthMonth = parseInt(document.getElementById("birthMonth").value);
  const birthDay = parseInt(document.getElementById("birthDay").value);
  const gender = document.getElementById("gender").value;

  // Walidacja danych
  if (
    isNaN(birthYear) ||
    isNaN(birthMonth) ||
    isNaN(birthDay) ||
    birthYear < 1900 ||
    birthYear > 2100 ||
    birthMonth < 1 ||
    birthMonth > 12 ||
    birthDay < 1 ||
    birthDay > 31 ||
    (gender !== "female" && gender !== "male")
  ) {
    alert("Proszę uzupełnić poprawnie wszystkie pola.");
    return;
  }

  const adjustedYear = getAdjustedChineseYear(birthYear, birthMonth, birthDay);
  const { zodiacSign, zodiacElement } = getZodiacSignAndElement(adjustedYear);
  const birthElement = calculateBirthElement(birthYear);
  const kuaNumber = calculateKuaNumber(birthYear, gender);
  const favorableDirections = getFavorableDirections(kuaNumber);
  const unfavorableDirections = getUnfavorableDirections(kuaNumber);
  const recommendedColors = getRecommendedColors(birthElement);

  displayResults(
    zodiacSign,
    zodiacElement,
    birthElement,
    kuaNumber,
    favorableDirections,
    unfavorableDirections,
    recommendedColors
  );
}
function getZodiacSignAndElement(year) {
  const heavenlyStems = [
    "Drewno Yang", // 0
    "Drewno Yin", // 1
    "Ogień Yang", // 2
    "Ogień Yin", // 3
    "Ziemia Yang", // 4
    "Ziemia Yin", // 5
    "Metal Yang", // 6
    "Metal Yin", // 7
    "Woda Yang", // 8
    "Woda Yin", // 9
  ];

  const earthlyBranches = [
    "Szczur",
    "Wół",
    "Tygrys",
    "Królik",
    "Smok",
    "Wąż",
    "Koń",
    "Koza",
    "Małpa",
    "Kogut",
    "Pies",
    "Świnia",
  ];

  const cycleStart = 1984; // Rok Drewnianego Szczura
  const offset = year - cycleStart;

  const stemIndex = ((offset % 10) + 10) % 10;
  const branchIndex = ((offset % 12) + 12) % 12;

  return {
    zodiacSign: earthlyBranches[branchIndex],
    zodiacElement: heavenlyStems[stemIndex],
  };
}

function calculateBirthElement(year) {
  const remainder = year % 10;
  const elements = {
    0: "Metal",
    1: "Metal",
    2: "Woda",
    3: "Woda",
    4: "Drewno",
    5: "Drewno",
    6: "Ogień",
    7: "Ogień",
    8: "Ziemia",
    9: "Ziemia",
  };
  return elements[remainder];
}

function calculateKuaNumber(year, gender) {
  const shortYear = year % 100;
  let sum;

  if (gender === "female") {
    sum = year < 2000 ? shortYear + 5 : shortYear + 6;
  } else {
    sum = year < 2000 ? 10 - shortYear : 9 - shortYear;
  }

  sum = sum % 9 === 0 ? 9 : sum % 9;

  // Specjalne przypadki dla liczby 5
  if (sum === 5) {
    return gender === "female" ? 8 : 2;
  }

  return sum;
}

function getFavorableDirections(kuaNumber) {
  const favorableDirectionsMap = {
    1: ["Północ", "Południe", "Wschód", "Południowy Wschód"],
    2: ["Północny Wschód", "Zachód", "Południowy Zachód", "Północny Zachód"],
    3: ["Południe", "Wschód", "Północ", "Południowy Wschód"],
    4: ["Południe", "Wschód", "Północ", "Południowy Wschód"],
    6: ["Północny Zachód", "Zachód", "Północny Wschód", "Południowy Zachód"],
    7: ["Północny Zachód", "Zachód", "Północny Wschód", "Południowy Zachód"],
    8: ["Północny Wschód", "Zachód", "Południowy Zachód", "Północny Zachód"],
    9: ["Północ", "Południe", "Wschód", "Południowy Wschód"],
  };
  return favorableDirectionsMap[kuaNumber] || [];
}

function getUnfavorableDirections(kuaNumber) {
  const unfavorableDirectionsMap = {
    1: ["Południowy Zachód", "Północny Zachód", "Zachód", "Północny Wschód"],
    2: ["Południe", "Północ", "Południowy Wschód", "Wschód"],
    3: ["Południowy Zachód", "Północny Zachód", "Zachód", "Północny Wschód"],
    4: ["Południowy Zachód", "Północny Zachód", "Zachód", "Północny Wschód"],
    6: ["Południe", "Północ", "Południowy Wschód", "Wschód"],
    7: ["Południe", "Północ", "Południowy Wschód", "Wschód"],
    8: ["Południe", "Północ", "Południowy Wschód", "Wschód"],
    9: ["Południowy Zachód", "Północny Zachód", "Zachód", "Północny Wschód"],
  };
  return unfavorableDirectionsMap[kuaNumber] || [];
}

function getRecommendedColors(element) {
  const colorRecommendations = {
    Metal: ["Biały", "Złoty", "Srebrny", "Szary"],
    Woda: ["Niebieski", "Czarny", "Granatowy"],
    Drewno: ["Zielony", "Brązowy", "Turkusowy"],
    Ogień: ["Czerwony", "Pomarańczowy", "Fioletowy", "Różowy"],
    Ziemia: ["Żółty", "Beżowy", "Terakota"],
  };
  return colorRecommendations[element] || [];
}

function displayResults(
  zodiacSign,
  zodiacElement,
  birthElement,
  kuaNumber,
  favorableDirections,
  unfavorableDirections,
  recommendedColors
) {
  const resultsDiv = document.getElementById("results");
  const bestDoorDirection =
    favorableDirections.length > 0 ? favorableDirections[0] : "Brak danych";

  resultsDiv.innerHTML = `
    <h2>Twój profil Feng Shui</h2>
    <div class="result-section">
      <h4>Chiński znak zodiaku: <span class="highlight">${zodiacSign}(${zodiacElement})</span></h4>
      <p>Twój element urodzeniowy: <strong>${birthElement}</strong></p>
      <p>Twoja liczba Kua: <strong>${kuaNumber}</strong></p>
    </div>

    <div class="result-section">
      <h4>Korzystne kierunki:</h4>
      <ul>
        ${favorableDirections.map((dir) => `<li>${dir}</li>`).join("")}
      </ul>
    </div>

    <div class="result-section">
      <h4>Niekorzystne kierunki:</h4>
      <ul>
        ${unfavorableDirections.map((dir) => `<li>${dir}</li>`).join("")}
      </ul>
    </div>

    <div class="result-section">
      <h4>Zalecane kolory:</h4>
      <ul>
        ${recommendedColors.map((color) => `<li>${color}</li>`).join("")}
      </ul>
    </div>

    <div class="result-section">
      <h4>Najlepszy kierunek drzwi wejściowych:</h4>
      <p>${bestDoorDirection}</p>
    </div>
  `;
  resultsDiv.style.display = "block";
}
