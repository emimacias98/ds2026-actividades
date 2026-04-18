/* Ejercicio 4 - Arrays y bucles
● Crear un array con al menos 8 números
● Usando for o for...of, calcular y mostrar en consola:
○ La suma total
○ El promedio
○ El número mayor
○ El número menor
● Crear una función generarAsteriscos(n) que reciba un número y
retorne un string con esa cantidad de asteriscos (ej:
generarAsteriscos(5) → "*****"). Usar un bucle for. */ 

const numeros = [2, 4, 7, 9, 1, 6, 8, 5];

let sumaTotal = 0;
let mayor = numeros[0];
let menor = numeros[0];

for (let num of numeros) {
    sumaTotal+=num;

    if (num > mayor) {
        mayor = num;
    }
    if (num < menor) {
        menor = num;
    }
}

const promedio = sumaTotal/numeros.length;

console.log(`Suma total: ${sumaTotal}`);
console.log(`Promedio: ${promedio}`);
console.log(`Numero mayor: ${mayor}`);
console.log(`Numero menor: ${menor}`);

function generarAsteriscos(n) {
    let resultado = "";
    for (let i= 0; i < n; i++){
        resultado+="*";
    }
    return resultado;
}

console.log(generarAsteriscos(5));
console.log(generarAsteriscos(10));





