const inputTemp = document.getElementById("temperatura_corporea");

inputTemp.addEventListener("input", function () {
  const valore = parseFloat(this.value);

  if (!isNaN(valore) && (valore < 35 || valore > 38)) {
    this.classList.add("giallo");
  } else {
    this.classList.remove("giallo");
  }
});