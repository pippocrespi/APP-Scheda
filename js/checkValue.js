const campi = document.querySelectorAll('input[type="number"][data-min][data-max][data-type]');

campi.forEach(campo => {
    campo.addEventListener('change', function () {
        const valore = parseFloat(this.value);
        const min = parseFloat(this.dataset.min);
        const max = parseFloat(this.dataset.max);
        const tipo = this.dataset.type;

        if (isNaN(valore)) return; // Campo vuoto → nessun controllo

        this.style.backgroundColor = "white";

        if (tipo === "soft") {
            if (valore < min) {

                this.style.backgroundColor = "yellow";
            } else if (valore > max) {
                this.style.backgroundColor = "yellow";
            }
        }

        if (tipo === "hard") {
            if (valore < min || valore > max) {
                alert(`Il valore deve essere tra ${min} e ${max}`);
                this.value = ""; // Svuota il campo
            }
        }
    });
});