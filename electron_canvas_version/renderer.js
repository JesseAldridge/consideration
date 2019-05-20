(function() {
  let item_type = 'text';

  const text_button = document.getElementById('text-btn')
  text_button.addEventListener('click', function() {
    item_type = 'text';
  })

  const line_button = document.getElementById('line-btn')
  line_button.addEventListener('click', function() {
    item_type = 'line';
    console.log('set item_type:', item_type);
  })

  let line = null;
  const shapes = [];

  const canvas = document.getElementById("myCanvas");
  canvas.addEventListener('click', function(e) {
    console.log('clicked canvas')

    const x = e.clientX - canvas.getBoundingClientRect().left,
          y = e.clientY - canvas.getBoundingClientRect().top;

    if(item_type == 'text') {
      const input = document.createElement("input");

      input.style.left = x;
      input.style.top = y;
      input.style.position = "absolute";
      document.getElementsByTagName("BODY")[0].appendChild(input);
    }
    else if(item_type == 'line') {
      if(line)
        line = null;
      else {
        line = {type: 'line', x1: x, y1: y, x2: x, y2: y};
        shapes.push(line);
      }

      redraw();
    }
  }, false);


  const ctx = canvas.getContext('2d')
  let redraw_timeout = null
  let last_ran = null

  canvas.addEventListener('mousemove', function(e) {
    const x = e.clientX - canvas.getBoundingClientRect().left,
          y = e.clientY - canvas.getBoundingClientRect().top;

    if(line) {
      line.x2 = x;
      line.y2 = y;
    }

    redraw();
  }, false);

  function redraw() {
    // if just ran
    if(last_ran && last_ran > new Date().getTime() - 30) {
      clearTimeout(redraw_timeout);
      redraw_timeout = setTimeout(redraw, 50);
      return;
    }

    last_ran = new Date().getTime();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(function(shape) {
      if(shape.type == 'line') {
        ctx.beginPath();
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        ctx.stroke();
        ctx.closePath();
      }
    })
  }
})();
