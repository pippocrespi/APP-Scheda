inputValanga = document.getElementById("ora_valanga");
inputDisseppellimento = document.getElementById("ora_disseppellimento");
spanDurata = document.getElementById("durata_seppellimento");
const checkboxSegniNo = document.getElementById("valanga_segni_vitali_no");
const extraChecks = document.getElementById("valanga_check_extra");

let durataInMinuti = 0; // da usare nella logica condizionale

function calcolaDurata() {
    const t1 = inputValanga.value;
    const t2 = inputDisseppellimento.value;

    if (t1 && t2) {
        const [h1, m1] = t1.split(":").map(Number);
        const [h2, m2] = t2.split(":").map(Number);

        let inizio = new Date(0, 0, 0, h1, m1);
        let fine = new Date(0, 0, 0, h2, m2);

        if (fine < inizio) {
            // Caso in cui il disseppellimento è dopo la mezzanotte
            fine.setDate(fine.getDate() + 1);
        }

        const diffMs = fine - inizio;
        durataInMinuti = Math.floor(diffMs / 60000);
        const ore = Math.floor(durataInMinuti / 60);
        const minuti = durataInMinuti % 60;

        const durataFormattata = `${String(ore).padStart(2, '0')}:${String(minuti).padStart(2, '0')}`;
        spanDurata.textContent = durataFormattata;
    } else {
        durataInMinuti = 0;
        spanDurata.textContent = "--:--";
    }

    controllaMostraExtra(); // Verifica se mostrare il blocco extra
}

function controllaMostraExtra() {
    const panel = document.getElementById("valanga_check_extra")?.closest(".panel");

    if (checkboxSegniNo.checked && durataInMinuti > 60) {
        extraChecks.classList.remove("hidden");
    } else {
        extraChecks.classList.add("hidden");
    }

    // Aggiorna l'altezza dell'accordion se visibile
    aggiornaAltezzaAccordion(panel);
}

// Event listeners
inputValanga.addEventListener("input", calcolaDurata);
inputDisseppellimento.addEventListener("input", calcolaDurata);
checkboxSegniNo.addEventListener("change", controllaMostraExtra);

// Se usi checkbox esclusivi (si/no), puoi aggiungere anche:
document.getElementById("valanga_segni_vitali_si").addEventListener("change", controllaMostraExtra);
