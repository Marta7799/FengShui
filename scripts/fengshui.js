function calculateFengShuiProfile() {
    const birthYear = parseInt(document.getElementById('birthYear').value);
    const birthMonth = parseInt(document.getElementById('birthMonth').value);
    const birthDay = parseInt(document.getElementById('birthDay').value);
    const gender = document.getElementById('gender').value;

    const zodiacSign = calculateChineseZodiac(birthYear);
    const birthElement = calculateBirthElement(birthYear);
    const kuaNumber = calculateKuaNumber(birthYear, gender);
    const favorableDirections = getFavorableDirections(kuaNumber);
    const unfavorableDirections = getUnfavorableDirections(kuaNumber);
    const recommendedColors = getRecommendedColors(birthElement);

    displayResults(zodiacSign, birthElement, kuaNumber, favorableDirections, unfavorableDirections, recommendedColors);
  }

  function calculateChineseZodiac(year) {
    const zodiacSigns = ["Szczur", "Wół", "Tygrys", "Królik", "Smok", "Wąż", "Koń", "Koza", "Małpa", "Kogut", "Pies", "Świnia"];
    return zodiacSigns[(year - 4) % 12];
  }

  function calculateBirthElement(year) {
    const remainder = year % 10;
    const elements = {
      0: "Metal", 1: "Metal",
      2: "Woda", 3: "Woda",
      4: "Drewno", 5: "Drewno",
      6: "Ogień", 7: "Ogień",
      8: "Ziemia", 9: "Ziemia"
    };
    return elements[remainder];
  }

  function calculateKuaNumber(year, gender) {
    const lastDigit = year % 10;
    if (gender === "female") {
      let sum = lastDigit + 5;
      if (sum > 9) {
        sum = Math.floor(sum / 10) + (sum % 10);
      }
      return sum === 5 ? 8 : sum;
    } else {
      let result = 10 - lastDigit;
      if (result === 5) return 2;
      if (result === 10) return 1;
      return result;
    }
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
      9: ["Północ", "Południe", "Wschód", "Południowy Wschód"]
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
      9: ["Południowy Zachód", "Północny Zachód", "Zachód", "Północny Wschód"]
    };
    return unfavorableDirectionsMap[kuaNumber] || [];
  }

  function getRecommendedColors(element) {
    const colorRecommendations = {
      "Metal": ["Biały", "Złoty", "Srebrny", "Szary"],
      "Woda": ["Niebieski", "Czarny", "Granatowy"],
      "Drewno": ["Zielony", "Brązowy", "Turkusowy"],
      "Ogień": ["Czerwony", "Pomarańczowy", "Fioletowy", "Różowy"],
      "Ziemia": ["Żółty", "Beżowy", "Terakota"]
    };
    return colorRecommendations[element] || [];
  }

  function displayResults(zodiacSign, birthElement, kuaNumber, favorableDirections, unfavorableDirections, recommendedColors) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
      <h2>Twój profil Feng Shui</h2>
      <div class="result-section">
        <h3>Chiński znak zodiaku: <span class="highlight">${zodiacSign}</span></h3>
        <p>Twój element urodzeniowy: <strong>${birthElement}</strong></p>
        <p>Twoja liczba Kua: <strong>${kuaNumber}</strong></p>
      </div>

      <div class="result-section">
        <h3>Korzystne kierunki:</h3>
        <ul>
          ${favorableDirections.map(dir => `<li>${dir}</li>`).join('')}
        </ul>
      </div>

      <div class="result-section">
        <h3>Niekorzystne kierunki:</h3>
        <ul>
          ${unfavorableDirections.map(dir => `<li>${dir}</li>`).join('')}
        </ul>
      </div>

      <div class="result-section">
        <h3>Zalecane kolory:</h3>
        <ul>
          ${recommendedColors.map(color => `<li>${color}</li>`).join('')}
        </ul>
      </div>
    `;
    resultsDiv.style.display = 'block';
  }