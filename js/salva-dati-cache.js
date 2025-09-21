// --- Salvataggio automatico ---
function saveField(field) {
  let value;
  if (field.type === "checkbox" || field.type === "radio") {
    value = field.checked;
  } else {
    value = field.value;
  }
  localStorage.setItem(field.id || field.name, value);
}

// --- Ripristina valori ---
function restoreFields() {
  const fields = document.querySelectorAll("input, textarea, select");
  fields.forEach(field => {
    const saved = localStorage.getItem(field.id || field.name);
    if (saved !== null) {
      if (field.type === "checkbox" || field.type === "radio") {
        field.checked = (saved === "true");
      } else {
        field.value = saved;
      }
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
}

// Vecchio script che calcellava tutti i campi
/*
// --- Mostra modal ---
function openClearModal() {
  document.getElementById("clearModal").style.display = "flex";
}

// --- Svuota tutti i campi e localStorage ---

function clearAllFields() {
  localStorage.clear();
  const fields = document.querySelectorAll("input, textarea, select");
  fields.forEach(field => {
    if (field.type === "checkbox" || field.type === "radio") {
      field.checked = false;
    } else {
      field.value = "";
    }
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
  */

// Nuova funzione per svuotare campi

// --- Svuota tutti i campi e localStorage ---
document.addEventListener("DOMContentLoaded", () => {

  // Mostra modal
  function openClearModal() {
    const modal = document.getElementById("clearModal");
    if (modal) modal.style.display = "flex";
  }

  // Svuota tutti i campi, slider dolore e tab
  function clearAllFields() {
    // Svuota localStorage
    localStorage.clear();

    // Svuota input, textarea, select
    const fields = document.querySelectorAll("input, textarea, select");
    fields.forEach(field => {
        if (field.type === "checkbox" || field.type === "radio") {
            field.checked = false;
        } else {
            field.value = "";
        }
        field.dispatchEvent(new Event("input", { bubbles: true }));
        field.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Reset slider dolore
    const doloreRange = document.getElementById("doloreRange");
    const doloreValue = document.getElementById("doloreValue");
    if (doloreRange && doloreValue) {
        doloreRange.value = 0;
        doloreValue.textContent = "NON DEFINITO";
    }

    // Reset tabella rivalutazioni
    if (typeof paramLabels !== "undefined") {
        // Inizializza la prima tab con tutti i campi vuoti, compreso "RIVALUTA (Ora)"
        window.tabData = {
            1: paramLabels.map(() => ({ value: "" }))
        };
    }

    window.columnCount = 1;
    window.activeTabIndex = 1;

    // Ricrea la prima tab
    const tabList = document.getElementById("tabs");
    if (tabList) {
        tabList.innerHTML = "";
        const firstTab = document.createElement("li");
        firstTab.classList.add("tab", "active");
        firstTab.textContent = "1";
        firstTab.dataset.index = "1";
        firstTab.onclick = () => { if (typeof showTab === "function") showTab(1); };
        tabList.appendChild(firstTab);
    }

    // Pulisci il contenuto della tab
    const tabContent = document.getElementById("tab-content");
    if (tabContent) tabContent.innerHTML = "";

    // Mostra la prima tab
    if (typeof showTab === "function") showTab(1);

    // Chiudi modal
    const modal = document.getElementById("clearModal");
    if (modal) modal.style.display = "none";
}


  // Assegna listener ai bottoni
  const confirmYes = document.getElementById("clearYes");
  const confirmNo = document.getElementById("clearNo");

  if (confirmYes) confirmYes.addEventListener("click", clearAllFields);
  if (confirmNo) confirmNo.addEventListener("click", () => {
    const modal = document.getElementById("clearModal");
    if (modal) modal.style.display = "none";
  });

  // Collega bottone Svuota campi
  const clearBtn = document.querySelector("button[onclick='openClearModal()']");
  if (clearBtn) clearBtn.addEventListener("click", openClearModal);

});



// --- Collego i bottoni del modal SOLO DOPO CHE IL DOM È CARICATO ---
document.addEventListener("DOMContentLoaded", () => {
  const confirmYes = document.getElementById("clearYes");
  const confirmNo = document.getElementById("clearNo");

  if (confirmYes) confirmYes.addEventListener("click", clearAllFields);
  if (confirmNo) confirmNo.addEventListener("click", () => {
    document.getElementById("clearModal").style.display = "none";
  });
});


// --- Inizializzazione al caricamento DOM ---
document.addEventListener("DOMContentLoaded", () => {
  const fields = document.querySelectorAll("input, textarea, select");

  // Salvataggio automatico su ogni campo
  fields.forEach(field => {
    field.addEventListener("input", () => saveField(field));
    field.addEventListener("change", () => saveField(field));
  });

  // Ripristina valori salvati
  restoreFields();

  // Collega bottoni del modal
  const confirmYes = document.getElementById("clearYes");
  const confirmNo = document.getElementById("clearNo");
  const clearModal = document.getElementById("clearModal");

  confirmYes.addEventListener("click", () => {
    clearAllFields();
    clearModal.style.display = "none";
  });

  confirmNo.addEventListener("click", () => {
    clearModal.style.display = "none";
  });
});