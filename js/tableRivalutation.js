function aggiornaOraRivaluta(tabContent) {
    const timeInput = tabContent.querySelector("input[type='time']");
    if (!timeInput) return;

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");

    timeInput.value = `${hh}:${mm}`;
}

// Aggiunge event listener a tutti i tab
document.querySelectorAll(".tab-content").forEach(tab => {
    tab.querySelectorAll("input[type='number'], select").forEach(element => {
        element.addEventListener("input", () => aggiornaOraRivaluta(tab));
    });
});