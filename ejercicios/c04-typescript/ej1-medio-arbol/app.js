"use strict";
const input = document.getElementById("inputAltura");
const boton = document.getElementById("btnGenerar");
const display = document.getElementById("resultado");
boton.addEventListener("click", () => {
    const altura = parseInt(input.value);
    if (isNaN(altura) || altura < 1) {
        display.innerText = "Error: ingresá un número válido.";
        display.style.color = "red";
        return;
    }
    display.style.color = "black";
    let arbol = "";
    for (let i = 1; i <= altura; i++) {
        arbol += "*".repeat(i) + "\n";
    }
    display.innerText = arbol;
});
