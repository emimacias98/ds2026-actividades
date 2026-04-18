const input = document.getElementById("inputAltura");
const boton = document.getElementById("btnGenerar");
const display = document.getElementById("resultado");

boton.addEventListener("click", () => {
    const altura = parseInt(input.value);

    if(isNaN(altura) || altura < 1) {
        display.innerText = "Error: Por favor, ingresa un numero mayor a 0.";
        display.style.color = "red"
        return;
    }

    display.style.color = "black"
    let arbol = "";

    for(let i = 1; i <= altura; i++){
        for(let j = 0; j < i; j++){
            arbol+="*";
        }
        arbol += "\n";
    }
    display.innerText = arbol;
});