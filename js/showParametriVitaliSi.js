const vitaleSi = document.getElementById("valanga_segni_vitali_si");
const vitaleNo = document.getElementById("valanga_segni_vitali_no");
const divExtra = document.getElementById("extra_vitali_si");

function aggiornaExtraVitali() {
  const panel = divExtra.closest(".panel"); // trova il pannello accordion che lo contiene

  if (vitaleSi.checked) {
    divExtra.classList.remove("hidden");
  } else {
    divExtra.classList.add("hidden");
  }

  // 🔁 aggiorna l'altezza del pannello accordion se già aperto
  aggiornaAltezzaAccordion(panel);
}

vitaleSi.addEventListener("change", aggiornaExtraVitali);
vitaleNo.addEventListener("change", aggiornaExtraVitali);
