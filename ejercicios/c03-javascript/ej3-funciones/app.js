/* Ejercicio 3 — Funciones con lógica
● Crear función calcularPrecioFinal(monto, medioPago) donde
medioPago es "E" (efectivo), "D" (débito) o "C" (crédito):
○ Monto menor a $200: sin descuento
○ Entre $200 y $400: 30% off en efectivo, 20% débito, 10%
crédito
○ Mayor a $400: 40% off para todos
○ Retornar el monto final
● Probar con al menos 5 combinaciones diferentes de monto y
medio de pago. Mostrar cada resultado en consola con template
literals: "Monto: $X | Pago: Y | Final: $Z" */ 


function calcularPrecioFinal(monto, medioPago){
    if(monto < 200) {
        return monto;
    } else if (monto >= 200 && monto <= 400){
        if(medioPago === "E"){
            return monto * 0.7;
        } else if (medioPago === "D"){
            return monto * 0.8;
        } else if (medioPago === "C"){
            return monto * 0.9;
        }
    }
    else {
        return monto * 0.6;
    }
}

let m1 = 150, p1 = "E";
console.log(`Monto: $${m1} | Pago: ${p1} | Final: $${calcularPrecioFinal(m1,p1)}`);

let m2 = 300, p2 = "E";
console.log(`Monto: $${m2} | Pago: ${p2} | Final: $${calcularPrecioFinal(m2,p2)}`);

let m3 = 300, p3 = "D";
console.log(`Monto: $${m3} | Pago: ${p3} | Final: $${calcularPrecioFinal(m3,p3)}`);

let m4 = 300, p4 = "C";
console.log(`Monto: $${m4} | Pago: ${p4} | Final: $${calcularPrecioFinal(m4,p4)}`);

let m5 = 500, p5 = "C";
console.log(`Monto: $${m5} | Pago: ${p5} | Final: $${calcularPrecioFinal(m5,p5)}`);
