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
  fetch("https://api.whitelotus8.pl/api/qimen")
    .then((res) => res.json())
    .then((data) => {
      const grid = document.getElementById("qiMenGrid");
      grid.innerHTML = "";
      data.cells.forEach((cellData) => {
        const cell = document.createElement("div");
        cell.classList.add("qiMen-cell", cellData.energyType);
        cell.innerHTML = `
          <div class="symbol">${cellData.symbols[0]}</div>
          <div class="label">Bramka: ${cellData.gate}</div>
          <div class="label">Gwiazda: ${cellData.star}</div>
        `;
        grid.appendChild(cell);
      });
    })
    .catch((err) => console.error("Błąd ładowania danych QiMen:", err));
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
  header.textContent = `Aktualna data i godzina: ${formatted}`;
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
