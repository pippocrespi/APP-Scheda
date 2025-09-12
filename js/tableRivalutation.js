let columnCount = 1;

function handleInput(element) {
  const cell = element.parentElement;
  const colIndex = cell.cellIndex;
  const table = document.getElementById("valutazione-table");

  // Orario automatico
  const rivalutaRow = table.rows[1];
  const timeCell = rivalutaRow.cells[colIndex];
  if (timeCell.textContent.trim() === "") {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeCell.textContent = timeString;
  }

  // Aggiunta nuova colonna se è l'ultima
  if (colIndex === columnCount) {
    addNewColumn();
  }

  // Applica il colore in base al valore
  applyColor(element);
}

function applyColor(element) {
  const cell = element.parentElement;
  const row = cell.parentElement;
  const label = row.cells[0].textContent.trim();

  // Pulisci classi di colore precedenti
  cell.classList.remove("verde", "giallo", "arancione", "rosso");

  let value = element.value;
  if (label === "AVPU") {
    switch (value) {
      case "A": cell.classList.add("verde"); break;
      case "V": cell.classList.add("giallo"); break;
      case "P": cell.classList.add("arancione"); break;
      case "U": cell.classList.add("rosso"); break;
    }
  } else if (label === "Freq. Respiratoria") {
    let num = parseInt(value);
    if (!isNaN(num)) {
      if (num >= 12 && num <= 18) cell.classList.add("verde");
      else if ((num >= 7 && num <= 11) || (num >= 19 && num <= 23)) cell.classList.add("giallo");
      else cell.classList.add("rosso");
    }
  } else if (label === "Saturimetro") {
    let num = parseInt(value);
    if (!isNaN(num)) {
      if (num > 95) cell.classList.add("verde");
      else if (num >= 90 && num <= 95) cell.classList.add("giallo");
      else if (num < 90) cell.classList.add("rosso");
    }
  } else if (label === "Dolore") {
    let num = parseInt(value);
    if (!isNaN(num)) {
      if (num >= 0 && num <= 3) cell.classList.add("verde");
      else if (num >= 4 && num <= 6) cell.classList.add("giallo");
      else if (num >= 7 && num <= 10) cell.classList.add("rosso");
    }
  }
}

function addNewColumn() {
  columnCount++;
  const table = document.getElementById("valutazione-table");

  // Aggiungi intestazione
  const headerRow = document.getElementById("header-row");
  const newHeader = document.createElement("th");
  newHeader.textContent = columnCount;
  headerRow.appendChild(newHeader);

  // RIGA 1: Orario
  table.rows[1].appendChild(document.createElement("td")).classList.add("auto-time");

  // RIGA 2: AVPU
  const avpuCell = document.createElement("td");
  const avpuSelect = document.createElement("select");
  avpuSelect.innerHTML = `
    <option value="">--</option>
    <option value="A">A</option>
    <option value="V">V</option>
    <option value="P">P</option>
    <option value="U">U</option>`;
  avpuSelect.onchange = () => handleInput(avpuSelect);
  avpuCell.appendChild(avpuSelect);
  table.rows[2].appendChild(avpuCell);

  // Campi numerici (righe 3–6)
  for (let i = 3; i < table.rows.length; i++) {
    const inputCell = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.onchange = () => handleInput(input);
    inputCell.appendChild(input);
    table.rows[i].appendChild(inputCell);
  }
}