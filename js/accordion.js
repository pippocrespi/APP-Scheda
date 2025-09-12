var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // Toggle "active" class
    this.classList.toggle("active");

    // Toggle panel visibility
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }

    // Cambia il testo da + TESTO a - TESTO e viceversa
    if (this.innerText.trim().startsWith("+")) {
      this.innerText = this.innerText.replace("+", "-");
    } else if (this.innerText.trim().startsWith("-")) {
      this.innerText = this.innerText.replace("-", "+");
    }
  });
}