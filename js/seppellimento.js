
inputValanga = document.getElementById("ora_valanga");
inputDisseppellimento = document.getElementById("ora_disseppellimento");
spanDurata = document.getElementById("durata_seppellimento");

function calcolaDurata() {
    const t1 = inputValanga.value;
    const t2 = inputDisseppellimento.value;

    if (t1 && t2) {
        const [h1, m1] = t1.split(":").map(Number);
        const [h2, m2] = t2.split(":").map(Number);

        let inizio = new Date(0, 0, 0, h1, m1);
        let fine = new Date(0, 0, 0, h2, m2);

        if (fine < inizio) {
            // Caso in cui l'orario del disseppellimento è dopo la mezzanotte
            fine.setDate(fine.getDate() + 1);
        }

        const diffMs = fine - inizio;
        const diffMin = Math.floor(diffMs / 60000);
        const ore = Math.floor(diffMin / 60);
        const minuti = diffMin % 60;

        const durataFormattata = `${String(ore).padStart(2, '0')}:${String(minuti).padStart(2, '0')}`;
        spanDurata.textContent = durataFormattata;
    } else {
        spanDurata.textContent = "--:--";
    }
}

inputValanga.addEventListener("input", calcolaDurata);
inputDisseppellimento.addEventListener("input", calcolaDurata);
