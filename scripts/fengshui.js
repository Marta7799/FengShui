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

  const zodiacSign = calculateChineseZodiac(birthYear);
  const birthElement = calculateBirthElement(birthYear);
  const kuaNumber = calculateKuaNumber(birthYear, gender);
  const favorableDirections = getFavorableDirections(kuaNumber);
  const unfavorableDirections = getUnfavorableDirections(kuaNumber);
  const recommendedColors = getRecommendedColors(birthElement);

  displayResults(
    zodiacSign,
    birthElement,
    kuaNumber,
    favorableDirections,
    unfavorableDirections,
    recommendedColors
  );
}

function calculateChineseZodiac(year) {
  const zodiacSigns = [
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
  return zodiacSigns[(year - 4) % 12];
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
      <h4>Chiński znak zodiaku: <span class="highlight">${zodiacSign}</span></h4>
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
