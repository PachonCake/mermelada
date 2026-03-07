const diccionarioMedico = {
  celula: "Unidad básica estructural y funcional de los seres vivos.",
  homeostasis: "Capacidad del organismo para mantener condiciones internas estables.",
  taquicardia: "Frecuencia cardíaca mayor a 100 latidos por minuto.",
  arteria: "Vaso sanguíneo que transporta sangre desde el corazón."
};
function buscarTermino(){
  let palabra = document.getElementById("busqueda").value.toLowerCase();
  let resultado = document.getElementById("resultado");
  if(diccionarioMedico[palabra]){
    resultado.innerHTML = `
    <h3>${palabra}</h3>
    <p>${diccionarioMedico[palabra]}</p>
    `;
  }else{
    resultado.innerHTML = "<p>Término no encontrado.</p>";
  }
}
