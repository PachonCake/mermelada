const diccionarioMedico = {
  celula: "Unidad básica estructural y funcional de los seres vivos.",
  homeostasis: "Capacidad del organismo para mantener condiciones internas estables.",
  taquicardia: "Frecuencia cardíaca mayor a 100 latidos por minuto.",
  arteria: "Vaso sanguíneo que transporta sangre desde el corazón.",
  mermelada: "Oyeme! ¿Es enserió? Ponte a trabajar y deja de distraerte",
  vena: "Vaso sanguíneo que lleva sangre al corazón."
};
function buscarTermino(){
  let palabra = document.getElementById("busqueda").value.toLowerCase();
  let sugerencias = document.getElementById("sugerencias");
  let resultado = document.getElementById("resultado");
  sugerencias.innerHTML = "";
  if(palabra.length === 0){
    resultado.innerHTML = "<p>Busca un término médico.</p>";
    return;
  }
  for(let termino in diccionarioMedico){
    if(termino.startsWith(palabra)){
      let item = document.createElement("div");
      item.textContent = termino;
      item.onclick = function(){
        document.getElementById("busqueda").value = termino;
        mostrarDefinicion(termino);
        sugerencias.innerHTML = "";
      };
      sugerencias.appendChild(item);
    }
  }
}
function mostrarDefinicion(termino){
  let resultado = document.getElementById("resultado");
  resultado.innerHTML = `
  <h3>${termino}</h3>
  <p>${diccionarioMedico[termino]}</p>
  `;
}
