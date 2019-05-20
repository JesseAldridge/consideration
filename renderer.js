(function() {
  let line = null;
  let text = null;
  const shapes = [];
  const info_strs = [];
  for(let i = 0; i < 10; i++)
    info_strs.push('')

  const canvas = document.getElementById("myCanvas");
  canvas.addEventListener('click', function(e) {
    const x = e.clientX - canvas.getBoundingClientRect().left,
          y = e.clientY - canvas.getBoundingClientRect().top;

    if(line)
      line = null;
    else {
      line = {type: 'line', x1: x, y1: y, x2: x, y2: y};
      shapes.push(line);
    }

    redraw();
  }, false);

  canvas.addEventListener("dblclick", function(e) {
    shapes.pop() // pop the last line from the first click
    const x = e.clientX - canvas.getBoundingClientRect().left,
          y = e.clientY - canvas.getBoundingClientRect().top;

    text = {type: 'text', x: x, y: y, string: 'test'};
    shapes.push(text);
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

  window.addEventListener('keypress', function(e) {
    if(text) {
      const new_ch = String.fromCharCode(e.which)
      if(new_ch.trim() != '')
        text.string += new_ch
      redraw()
    }
  }, true);

  window.addEventListener('keydown', function(e) {
    if(text) {
      if(e.which == 8) // backspace
        text.string = text.string.substring(0, text.string.length - 1)
      else if(e.which == 13) // return
        text.string += '\n'

      redraw()
    }
  }, true);

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
      else if(shape.type == 'text') {
        ctx.font = '10pt sans-serif'
        ctx.textAlign = "left"
        shape.string.split('\n').forEach(function(line, index) {
          ctx.fillText(line, shape.x, shape.y + index * 20)
        })
      }
    })

    info_strs[0] = `shape count: ${shapes.length}`
    info_strs.forEach(function(s, index) {
      ctx.font = '10pt sans-serif'
      ctx.textAlign = "left"
      ctx.fillText(s, 10, 10 + index * 20)
    })
  }
})();
