var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // Toggle "active" class
    this.classList.toggle("active");

    // Toggle panel visibility
    var panel = this.nextElementSibling;

    // Cambia il testo da + TESTO a - TESTO e viceversa
    if (this.innerText.trim().startsWith("+")) {
      this.innerText = this.innerText.replace("+", "-");
    } else if (this.innerText.trim().startsWith("-")) {
      this.innerText = this.innerText.replace("-", "+");
    }

    // Gestisci l'altezza massima per l'animazione
    if (this.classList.contains("active")) {
      // Imposta l'altezza massima del pannello per farlo espandere
      panel.style.maxHeight = panel.scrollHeight + "px"; // scrollHeight è l'altezza effettiva del contenuto
    } else {
      // Chiudi il pannello riducendo maxHeight a 0
      panel.style.maxHeight = null; // In automatico si ridurrà a 0 e il pannello si nasconderà
    }
  });
}


function aggiornaAltezzaAccordion(panel) {
    if (panel && panel.style.maxHeight) {
      // Recalcola l'altezza se è già aperto
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
  