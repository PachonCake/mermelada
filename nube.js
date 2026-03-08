    /// Start ///
    console.log('Hello Universe')
    console.log('First Log')
    function HelloWorld(str) {
        console.log(str);
}
    HelloWorld("HelloWorld");
    /// End ///
document.addEventListener("DOMContentLoaded", () => {
    ///Clock///
    function updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        minutes = (minutes < 10 ? "0" : "") + minutes;
        seconds = (seconds < 10 ? "0" : "") + seconds;
        var time = hours + ":" + minutes;
        var secondsTime = '<span class="seconds">' + seconds + '</span>';
        var clocks = document.getElementsByClassName("clock");
        for (var i = 0; i < clocks.length; i++){
            clocks[i].innerHTML = time + secondsTime;
        } setTimeout(updateClock, 1000);
    } updateClock();
    ///Sidebar///
    document.addEventListener("click", function(event) {
    var sidebar = document.querySelector(".sidebar");
    var checkbox = document.getElementById("checkbar");

    if (event.target !== sidebar && event.target !== checkbox && !sidebar.contains(event.target)) {
      checkbox.checked = false;
    }
  });
  const canvas = document.getElementById('nieve');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nieve = [];
for (let i = 0; i < 100; i++) {
  nieve.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    velocidad: Math.random() * 2 + 1,
    tamaño: Math.random() * 5 + 1
  });
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < nieve.length; i++) {
    ctx.beginPath();
    ctx.arc(nieve[i].x, nieve[i].y, nieve[i].tamaño, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(000, 255, 255, 0.3)';
    ctx.fill();
    nieve[i].y += nieve[i].velocidad;
    if (nieve[i].y > canvas.height) {
      nieve[i].y = 0;
      nieve[i].x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(animar);
}

animar();
})
/// Diccionario enfermería ///
     function cargar(pagina){
        fetch("./diccionario/" + pagina + ".html")
            .then(res => res.text())
            .then(data => {
                document.getElementById("contenido").innerHTML = data;
            });
    }
