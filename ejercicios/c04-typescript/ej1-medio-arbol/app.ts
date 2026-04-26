const input = document.getElementById("inputAltura") as HTMLInputElement;
const boton = document.getElementById("btnGenerar") as HTMLButtonElement;
const display = document.getElementById("resultado") as HTMLElement;

boton.addEventListener("click", () => {
    const altura: number = parseInt(input.value);

    if (isNaN(altura) || altura < 1) {
        display.innerText = "Error: ingresá un número válido.";
        display.style.color = "red";
        return;
    }

    display.style.color = "black";
    let arbol: string = "";

    for (let i: number = 1; i <= altura; i++) {
        arbol += "*".repeat(i) + "\n";
    }

    display.innerText = arbol;
});