(function() {
  const canvas = document.getElementById("myCanvas");
  // const ctx = canvas.getContext("2d");
  // ctx.fillStyle = "#FF00FF";
  // ctx.fillRect(5,10,150,75);

  canvas.addEventListener('click', function(e) {
    console.log('clicked canvas')
    const input = document.createElement("input");

    input.style.left = canvas.offsetLeft + e.clientX + "px";
    input.style.top = canvas.offsetTop + e.clientY + "px";
    input.style.position = "absolute";
    document.getElementsByTagName("BODY")[0].appendChild(input);
  }, false);
})();
