const qiMenLang = "pl";
const symbolMap = {
  // Gwiazdy
  "Tian Xin": "天心",
  "Tian Rui": "天瑞",
  "Tian Chong": "天沖",
  "Tian Fu": "天輔",
  "Tian Ying": "天英",
  "Tian Peng": "天蓬",
  "Tian Ren": "天任",
  "Tian Zhu": "天柱",
  "Tian Ji": "天機",

  // Bramy
  Open: "開",
  Rest: "休",
  Life: "生",
  Harm: "傷",
  Delusion: "杜",
  Scene: "景",
  Death: "死",
  Fear: "驚",
  Injury: "傷",

  // Duchy
  "White Tiger": "白虎",
  "Black Tortoise": "玄武",
  "Nine Heaven": "九天",
  "Nine Earth": "九地",
  "Six Harmony": "六合",
  Chief: "直符",
  Snake: "螣蛇",
  Moon: "太陰",
  Sun: "太陽",
};

const energyColors = {
  生: "#4CAF50", // life - green
  死: "#9E9E9E", // death - gray
  休: "#2196F3", // rest - blue
  傷: "#FF9800", // injury - orange
  杜: "#795548", // block - brown
  景: "#E91E63", // view - pink
  驚: "#9C27B0", // fear - purple
  開: "#3F51B5", // open - indigo
  陰: "#607D8B", // obscure - slate
  合: "#00BCD4", // harmony - cyan
};
const energyMeaning = {
  positive: ["開", "生", "休", "天心", "六合", "太陰", "直符"],
  negative: ["死", "驚", "傷", "白虎", "螣蛇", "勾陳"],
  neutral: ["杜", "景", "玄武", "九地", "九天"],
};

const directions = ["SE", "S", "SW", "E", "Center", "W", "NE", "N", "NW"];

const cellsData = [
  { palace: "Xun", symbols: ["地", "休", "丁"], star: "休", gate: "傷" },
  { palace: "Li", symbols: ["天", "生", "乙"], star: "生", gate: "開" },
  { palace: "Kun", symbols: ["符", "傷", "王"], star: "傷", gate: "杜" },
  { palace: "Zhen", symbols: ["雀", "開", "己"], star: "開", gate: "驚" },
  { palace: "Center", symbols: ["Yang 3"], star: "", gate: "" },
  { palace: "Dui", symbols: ["蛇", "杜", "辛"], star: "杜", gate: "合" },
  { palace: "Gen", symbols: ["陳", "驚", "戊"], star: "驚", gate: "死" },
  { palace: "Kan", symbols: ["合", "死", "癸"], star: "死", gate: "陰" },
  { palace: "Qian", symbols: ["陰", "景", "丙"], star: "景", gate: "開" },
];
function getEnergyClass(symbol) {
  if (energyMeaning.positive.includes(symbol)) return "positive";
  if (energyMeaning.negative.includes(symbol)) return "negative";
  return "neutral";
}
function describeSymbol(symbol) {
  const descriptions = {
    開: "Otwarcie, szanse",
    生: "Życie, wzrost",
    休: "Odpoczynek, regeneracja",
    死: "Zamknięcie, zakończenie",
    傷: "Zranienie, przeszkody",
    驚: "Zaskoczenie, stres",
    杜: "Blokada, powstrzymanie",
    景: "Widok, prezentacja",
    合: "Zjednoczenie, partnerstwo",
    陰: "Ukryte, pasywne",
    天心: "Wewnętrzna harmonia",
    六合: "Szansa współpracy",
    太陰: "Intuicja i ochrona",
    白虎: "Zagrożenie, konflikt",
    玄武: "Intryga, manipulacja",
    螣蛇: "Zamieszanie, lęki",
    勾陳: "Zatrzymanie, zwłoka",
    九天: "Inspiracja, wyższe cele",
    九地: "Fundament, stabilność",
    直符: "Autorytet, zgodność",
  };
  return descriptions[symbol] || "Brak opisu";
}

function createQiMenCell(data) {
  const cell = document.createElement("div");
  cell.className = "qi-men-cell";

  data.symbols.forEach((sym) => {
    const el = document.createElement("div");
    el.className = "symbol";
    el.textContent = sym;
    if (energyColors[sym]) el.style.color = energyColors[sym];
    cell.appendChild(el);
  });

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = `${data.palace}\nGwiazda: ${data.star}\nBrama: ${data.gate}`;
  cell.appendChild(tooltip);

  return cell;
}

function generateQiMenGrid() {
  const directions = ["SE", "S", "SW", "E", "Center", "W", "NE", "N", "NW"];
  const grid = document.getElementById("qiMenGrid");
  grid.innerHTML = "";

  fetch("https://api.whitelotus8.pl/api/qimen")
    .then((res) => res.json())
    .then((data) => {
      console.log("FULL RESPONSE:", data);

      // Uzupełnij deity, jeśli go brakuje
      const deityList = [
        "White Tiger",
        "Black Tortoise",
        "Nine Heaven",
        "Nine Earth",
        "Six Harmony",
        "Chief",
        "Snake",
        "Moon",
        "Sun",
      ];
      data.cells.forEach((cell, index) => {
        if (!cell.deity) {
          cell.deity = deityList[index % 9];
        }
        // Ewentualnie dopasuj inne klucze z API:
        if (cell.door && !cell.gate) {
          cell.gate = cell.door;
        }
      });

      data.cells.sort((a, b) => a.position - b.position);

      data.cells.forEach((cellData, index) => {
        const cell = document.createElement("div");
        cell.classList.add("qi-men-cell");

        // Kierunek
        const direction = document.createElement("div");
        direction.className = "direction";
        direction.textContent = directions[index];
        cell.appendChild(direction);

        // Wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "symbols-wrapper";

        const entries = [
          { label: "Gwiazda", key: "star" },
          { label: "Brama", key: "gate" },
          { label: "Duch", key: "deity" },
        ];

        entries.forEach(({ label, key }) => {
          const raw = cellData[key];
          const clean = raw?.trim?.();
          const value = symbolMap[clean] || clean || "-";

          const pair = document.createElement("div");
          pair.className = `symbol-pair-vertical ${getEnergyClass(value)}`;

          const symbol = document.createElement("div");
          symbol.className = `symbol ${getEnergyClass(value)}`;
          symbol.textContent = value;
          symbol.title = raw || "-"; // Tooltip na symbol

          const text = document.createElement("div");
          text.className = `label ${getEnergyClass(value)}`;
          text.textContent = label;

          pair.appendChild(symbol);
          pair.appendChild(text);
          wrapper.appendChild(pair);
        });

        cell.appendChild(wrapper);

        // Tooltip całego pola
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";

        const getDescription = (key) => {
          const raw = cellData[key]?.trim?.();
          const symbol = symbolMap[raw] || raw || "-";
          return `${symbol} - ${describeSymbol(symbol)}`;
        };

        tooltip.innerText = `
Kierunek: ${directions[index]}
Gwiazda: ${getDescription("star")}
Brama: ${getDescription("gate")}
Duch: ${getDescription("deity")}
        `.trim();

        cell.appendChild(tooltip);
        grid.appendChild(cell);
      });
    })
    .catch((err) => {
      console.error("Błąd ładowania danych QiMen:", err);
    });
}

function updateModalHeaderDateTime() {
  const header = document.getElementById("currentDateTime");
  if (!header) return;
  const now = new Date();
  const formatted = now.toLocaleString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  header.textContent = `${formatted}`;
}

function initQiMen() {
  updateModalHeaderDateTime();
  generateQiMenGrid();
  if (window.modalTimer) clearInterval(window.modalTimer);
  window.modalTimer = setInterval(() => {
    updateModalHeaderDateTime();
    // Refresh every 2 hours (for now simulate with shorter interval in development)
    if (new Date().getMinutes() % 2 === 0 && new Date().getSeconds() === 0) {
      generateQiMenGrid(); // In real version: fetch new data
    }
  }, 1000);
}
