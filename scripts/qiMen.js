const qiMenLang = "pl";

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
      data.cells.forEach((cellData, index) => {
        const cell = document.createElement("div");
        cell.classList.add("qi-men-cell");
        console.log("Dane z API:", data.cells);
        // Dodaj kierunek
        const direction = document.createElement("div");
        direction.className = "direction";
        direction.textContent = directions[index];
        cell.appendChild(direction);

        // Wrapper na symbole
        const wrapper = document.createElement("div");
        wrapper.className = "symbols-wrapper";

        const entries = [
          { label: "Gwiazda", value: cellData.star || "-" },
          { label: "Brama", value: cellData.gate || "-" },
          { label: "Duch", value: cellData.spirit || "-" },
        ];

        entries.forEach(({ label, value }) => {
          const pair = document.createElement("div");
          pair.className = `symbol-pair-vertical ${getEnergyClass(value)}`;

          const symbol = document.createElement("div");
          symbol.className = `symbol ${getEnergyClass(value)}`;
          symbol.textContent = value;

          const text = document.createElement("div");
          text.className = `label ${getEnergyClass(value)}`;
          text.textContent = label;

          pair.appendChild(symbol);
          pair.appendChild(text);
          wrapper.appendChild(pair);
        });

        cell.appendChild(wrapper);

        // Tooltip z opisem
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.innerText = `
Kierunek: ${directions[index]}
Gwiazda: ${cellData.star} - ${describeSymbol(cellData.star)}
Brama: ${cellData.gate} - ${describeSymbol(cellData.gate)}
Duch: ${cellData.spirit} - ${describeSymbol(cellData.spirit)}
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
