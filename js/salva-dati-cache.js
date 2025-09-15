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