let columnCount = 1;
let activeTabIndex = 1;

const paramLabels = [
    "RIVALUTA (Ora)",
    "AVPU",
    "Freq. Respiratoria",
    "Freq. Polso",
    "Saturimetro",
    "Dolore"
];

// dati per ogni tab: tabData[colIndex] = array dei parametri {value}
const tabData = {
    1: paramLabels.map(() => ({ value: "" }))
};

function showTab(index) {
    activeTabIndex = index;
    // aggiorna tab attivi
    document.querySelectorAll("#tabs .tab").forEach(tab => tab.classList.remove("active"));
    const activeTab = document.querySelector(`#tabs .tab[data-index="${index}"]`);
    if (activeTab) activeTab.classList.add("active");

    renderTab(index);
}

// Vecchia funzione renderTab()
/*
function renderTab(colIndex) {
    const container = document.getElementById("tab-content");
    container.innerHTML = "";

    const table = document.createElement("table");

    paramLabels.forEach((label, i) => {
        const row = document.createElement("tr");

        // prima colonna label fissa
        const labelCell = document.createElement("td");
        labelCell.textContent = label;
        labelCell.classList.add("fixed-label");
        row.appendChild(labelCell);

        // seconda colonna input o span
        const valueCell = document.createElement("td");

        if (i === 0) {
            // Orario automatico: span non modificabile
            const span = document.createElement("span");
            span.classList.add("auto-time");
            span.textContent = tabData[colIndex][0].value || "";
            // Non cambiare orario al click per evitare confusioni
            valueCell.appendChild(span);
        } else if (label === "AVPU") {
            const select = document.createElement("select");
            select.innerHTML = `
        <option value="">--</option>
        <option value="A">A</option>
        <option value="V">V</option>
        <option value="P">P</option>
        <option value="U">U</option>
      `;
            select.value = tabData[colIndex][i].value;
            select.onchange = (e) => handleInput(e.target, colIndex, i);
            valueCell.appendChild(select);
        } else {
            const input = document.createElement("input");
            input.type = "number";
            input.inputMode = "numeric";
            input.value = tabData[colIndex][i].value;
            input.onchange = (e) => handleInput(e.target, colIndex, i);
            valueCell.appendChild(input);
        }

        row.appendChild(valueCell);
        table.appendChild(row);

        // Applica il colore al caricamento (se valore presente)
        if (i !== 0 && tabData[colIndex][i].value !== "") {
            applyColor(valueCell.firstChild, label, tabData[colIndex][i].value);
        }
    });

    container.appendChild(table);
}
*/

// Nuova funzione renderTab()

function renderTab(colIndex) {
    const container = document.getElementById("tab-content");
    container.innerHTML = "";

    const table = document.createElement("table");

    paramLabels.forEach((label, i) => {
        const row = document.createElement("tr");

        // prima colonna label fissa
        const labelCell = document.createElement("td");
        labelCell.textContent = label;
        labelCell.classList.add("fixed-label");
        row.appendChild(labelCell);

        // seconda colonna input o select
        const valueCell = document.createElement("td");

        if (i === 0) {
            // Orario manuale: input type="time"
            const timeInput = document.createElement("input");
            timeInput.type = "time";
            timeInput.value = tabData[colIndex][0].value || "";
            timeInput.onchange = (e) => handleInput(e.target, colIndex, 0);
            valueCell.appendChild(timeInput);
        } else if (label === "AVPU") {
            const select = document.createElement("select");
            select.innerHTML = `
                <option value="">--</option>
                <option value="A">A</option>
                <option value="V">V</option>
                <option value="P">P</option>
                <option value="U">U</option>
            `;
            select.value = tabData[colIndex][i].value;
            select.onchange = (e) => handleInput(e.target, colIndex, i);
            valueCell.appendChild(select);
        } else {
            const input = document.createElement("input");
            input.type = "number";
            input.inputMode = "numeric";
            input.value = tabData[colIndex][i].value;
            input.onchange = (e) => handleInput(e.target, colIndex, i);
            valueCell.appendChild(input);
        }

        row.appendChild(valueCell);
        table.appendChild(row);

        // Applica il colore se il valore è presente e non è l'orario
        if (i !== 0 && tabData[colIndex][i].value !== "") {
            applyColor(valueCell.firstChild, label, tabData[colIndex][i].value);
        }
    });

    container.appendChild(table);
}


function applyColor(element, label, value) {
    const cell = element.closest("td");
    if (!cell) return;

    cell.classList.remove("verde", "giallo", "arancione", "rosso");

    let num = parseInt(value);
    if (label === "AVPU") {
        switch (value) {
            case "A": cell.classList.add("verde"); break;
            case "V": cell.classList.add("giallo"); break;
            case "P": cell.classList.add("arancione"); break;
            case "U": cell.classList.add("rosso"); break;
        }
    } else if (label === "Freq. Respiratoria") {
        if (!isNaN(num)) {
            if (num >= 12 && num <= 18) cell.classList.add("verde");
            else if ((num >= 7 && num <= 11) || (num >= 19 && num <= 23)) cell.classList.add("giallo");
            else cell.classList.add("rosso");
        }
    } else if (label === "Saturimetro") {
        if (!isNaN(num)) {
            if (num > 95) cell.classList.add("verde");
            else if (num >= 90 && num <= 95) cell.classList.add("giallo");
            else if (num < 90) cell.classList.add("rosso");
        }
    } else if (label === "Dolore") {
        if (!isNaN(num)) {
            if (num >= 0 && num <= 3) cell.classList.add("verde");
            else if (num >= 4 && num <= 6) cell.classList.add("giallo");
            else if (num >= 7 && num <= 10) cell.classList.add("rosso");
        }
    }
}

function addNewColumn() {
    columnCount++;
    const newIndex = columnCount;

    // Aggiungi nuova tab in alto
    const tabList = document.getElementById("tabs");
    const newTab = document.createElement("li");
    newTab.classList.add("tab");
    newTab.textContent = newIndex;
    newTab.dataset.index = newIndex;
    newTab.onclick = () => showTab(newIndex);
    tabList.appendChild(newTab);

    // Inizializza i dati per nuova colonna
    tabData[newIndex] = paramLabels.map(() => ({ value: "" }));

    // **NON mostrare subito la nuova tab**
    // Commenta o rimuovi la riga seguente per non cambiare tab automaticamente
    showTab(newIndex);
}

// Inizializza la pagina mostrando la prima tab
window.onload = () => {
    showTab(1);
};

// Vecchia handleInput()
/*
function handleInput(element, colIndex, paramIndex) {
    let value = element.value || element.textContent || "";

    // Se sto modificando una riga diversa dall'orario
    // ma l'orario della colonna è vuoto, lo imposto automaticamente
    if (paramIndex !== 0 && (!tabData[colIndex][0].value || tabData[colIndex][0].value.trim() === "")) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        tabData[colIndex][0].value = timeString;

        // Aggiorno la vista se la tab è attiva
        if (colIndex === activeTabIndex) {
            const container = document.getElementById("tab-content");
            const spanOrario = container.querySelector(".auto-time");
            if (spanOrario) spanOrario.textContent = timeString;
        }

        // Aggiorno il tab con "numero - orario"
        
        const tab = document.querySelector(`#tabs .tab[data-index="${colIndex}"]`);
        if (tab) {
            tab.textContent = `${colIndex} - ${timeString}`;
        }

    }

    // Ora salvo il valore modificato
    tabData[colIndex][paramIndex].value = value;

    // Applica colore solo se non è la riga orario
    if (paramIndex !== 0) {
        applyColor(element, paramLabels[paramIndex], value);
    }

    // Se siamo nell’ultima colonna (tab), aggiungine una nuova
    //  if (colIndex === columnCount) {
    //      addNewColumn();
    //  }
}
*/

// Nuova handleInput() Pippo
function handleInput(element, colIndex, paramIndex) {
    let value = element.value || element.textContent || "";

    // Salva il valore modificato
    tabData[colIndex][paramIndex].value = value;

    // Applica colore solo se non è la riga "RIVALUTA (Ora)"
    if (paramIndex !== 0) {
        applyColor(element, paramLabels[paramIndex], value);
    }
}



// Vecchia versione
// Script pippo per rimuovere la tab attiva con un pulsante -
/*
function removeActiveTab() {
    if (columnCount === 1) return; // Non rimuovere l'unica tab rimasta

    // Verifica se la tab attiva ha campi compilati (escludendo l'orario)
    const hasData = tabData[activeTabIndex].some((field, i) => i !== 0 && field.value.trim() !== "");

    if (hasData) {
        // Mostra il modale
        const modal = document.getElementById("confirmModal");
        modal.style.display = "flex";

        // Collego i pulsanti del modale ai nuovi ID
        document.getElementById("tabYes").onclick = () => {
            modal.style.display = "none";
            reallyRemoveActiveTab(); // rimuove davvero
        };
        document.getElementById("tabNo").onclick = () => {
            modal.style.display = "none"; // chiudi senza fare nulla
        };

    } else {
        // Nessun dato → rimuovi subito
        reallyRemoveActiveTab();
    }
}


function reallyRemoveActiveTab() {
    // Rimuovi i dati della tab attiva
    delete tabData[activeTabIndex];

    // Rimuovi l'elemento <li>
    const tabList = document.getElementById("tabs");
    const activeTab = tabList.querySelector(`.tab[data-index="${activeTabIndex}"]`);
    if (activeTab) tabList.removeChild(activeTab);

    // Riduci il contatore
    columnCount--;

    // Scegli la nuova tab attiva
    let newActiveIndex = activeTabIndex - 1;
    if (!tabData[newActiveIndex]) {
        const keys = Object.keys(tabData).map(Number).sort((a, b) => a - b);
        newActiveIndex = keys[keys.length - 1]; // ultima tab disponibile
    }

    showTab(newActiveIndex);
}
*/

function removeActiveTab() {
    if (columnCount === 1) return; // Non rimuovere l'unica tab rimasta

    const hasData = tabData[activeTabIndex].some((field, i) => i !== 0 && field.value.trim() !== "");

    const remove = () => {
        // Rimuovi i dati della tab attiva
        delete tabData[activeTabIndex];

        // Rimuovi l'elemento <li>
        const tabList = document.getElementById("tabs");
        const activeTab = tabList.querySelector(`.tab[data-index="${activeTabIndex}"]`);
        if (activeTab) tabList.removeChild(activeTab);

        // Riduci il contatore
        columnCount--;

        // Ricrea tabData e rinumera le tab
        const newTabData = {};
        let newIndex = 1;

        tabList.querySelectorAll(".tab").forEach(tab => {
            const oldIndex = parseInt(tab.dataset.index);
            tab.dataset.index = newIndex;
            tab.textContent = newIndex;
            newTabData[newIndex] = tabData[oldIndex];
            newIndex++;
        });

        // Aggiorna tabData con i nuovi indici
        for (const key in tabData) delete tabData[key];
        Object.assign(tabData, newTabData);

        // Scegli la nuova tab attiva
        let newActiveIndex = activeTabIndex;
        if (!tabData[newActiveIndex]) {
            newActiveIndex = newIndex - 1;
        }

        showTab(newActiveIndex);
    };

    if (hasData) {
        // Mostra il modale
        const modal = document.getElementById("confirmModal");
        modal.style.display = "flex";

        document.getElementById("tabYes").onclick = () => {
            modal.style.display = "none";
            remove();
        };
        document.getElementById("tabNo").onclick = () => {
            modal.style.display = "none"; // chiudi senza fare nulla
        };
    } else {
        remove(); // Rimuovi subito se nessun dato
    }
}
