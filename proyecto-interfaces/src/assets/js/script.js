export function initAnimation() {

const piezas = document.querySelectorAll('.pieza');
let estado = 1;

function transicionTangram() {
  estado = (estado+1 ) % 3;
  estado
  if (estado === 1) {
    // Configuración para Imagen 34
    piezas[0].style.transform = 'translate(160px, -100px) rotate(45deg)';   // grande1
    piezas[1].style.transform = 'translate(-75px, 75px) rotate(-180deg)';   // grande2
    piezas[2].style.transform = 'translate(-190px, 111.37px) rotate(-135deg)';     // mediano
    piezas[3].style.transform = 'translate(-20px, -220px) rotate(0deg)';    // cuadrado
    piezas[4].style.transform = 'translate(68px, -190px) rotate(-135deg)';   // pequeñoI
    piezas[5].style.transform = 'translate(-75px, 40px) rotate(0deg)';    // pequeño2
    piezas[6].style.transform = 'translate(0px, 150px) rotate(0deg)';  // paralelogramo
  } else if (estado === 2) {
    // Configuración para Imagen 126
    piezas[0].style.transform = 'translate(20px, -130px) rotate(-135deg)';    // grande1
    piezas[1].style.transform = 'translate(60px, -250px) rotate(45deg)';    // grande2
    piezas[2].style.transform = 'translate(0px, 230px) rotate(0deg)';   // mediano
    piezas[3].style.transform = 'translate(0px, 100px) rotate(0deg)';     // cuadrado
    piezas[4].style.transform = 'translate(-90px, 70px) rotate(45deg)';  // pequeñoI
    piezas[5].style.transform = 'translate(-290px, 10px) rotate(-135deg)'; // pequeño2
    piezas[6].style.transform = 'translate(120px, -15px) rotate(135deg)';  // paralelogramo
  } else {
    // Configuración para Imagen 38
    piezas[0].style.transform = 'translate(-120px, 100px) rotate(135deg)';            // grande1
    piezas[1].style.transform = 'translate(80px, 100px) rotate(-135deg)';       // grande2
    piezas[2].style.transform = 'translate(-60px, -80px) rotate(-90deg)';     // mediano
    piezas[3].style.transform = 'translate(-70px, 100px) rotate(0deg)';    // cuadrado
    piezas[4].style.transform = 'translate(-90px, 0px) rotate(-135deg)';        // pequeñoI
    piezas[5].style.transform = 'translate(-40px, -45px) rotate(45deg)';     // pequeño2
    piezas[6].style.transform = 'translate(200px, 100px) rotate(45deg)';    // paralelogramo
  }
}

// Cambia de imagen cada 3 segundos
setInterval(transicionTangram, 3000);
}