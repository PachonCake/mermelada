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
  if(diccionarioMedico[palabra]){
    mostrarDefinicion(palabra);
  }
  let ghost = document.getElementById("ghost");
  ghost.value = "";
  for(let termino in diccionarioMedico){
    if(termino.startsWith(palabra)){
      ghost.value = termino;
      break;
    }
  }
}
function mostrarDefinicion(termino){
  let data = diccionarioMedico[termino];
  let resultado = document.getElementById("resultado");
  let relacionadasHTML = "";
  if(data.relacionadas){
    relacionadasHTML = data.relacionadas
      .map(p => `<span class="relacionada">${p}</span>`)
      //.map(p => `<span class="relacionada" onclick="mostrarDefinicion('${p}')">${p}</span>`)
      .join(", ");
  }

resultado.innerHTML = `
<h3>${data.titulo}</h3>

<p><b>Definición:</b> ${data.definicion}</p>

<p><b>Ejemplo:</b> ${data.ejemplo}</p>

<p><b>Relacionadas:</b> ${relacionadasHTML}</p>
`;

}
function teclaEnter(event){
  if(event.key === "Enter"){
    let ghost = document.getElementById("ghost").value;
    if(ghost){
      document.getElementById("busqueda").value = ghost;
      mostrarDefinicion(ghost);
    }
  }
}
