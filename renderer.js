(function() {
  let mouse_pos = null;
  let selected_shape = null;
  const shapes = [];
  const info_strs = [];
  for(let i = 0; i < 10; i++)
    info_strs.push('')

  const canvas = document.getElementById("myCanvas");
  let click_timeout = null;
  let was_double_click = null;
  canvas.addEventListener('click', function(e) {
    was_double_click = false;
    clearTimeout(click_timeout);
    setTimeout(function() {
      if(was_double_click) {
        console.log('was_double_click')
        return
      }
      const x = e.clientX - canvas.getBoundingClientRect().left,
            y = e.clientY - canvas.getBoundingClientRect().top,
            shape_under_mouse = get_shape_under_mouse(x, y);

      if(shape_under_mouse) {
        selected_shape = shape_under_mouse;
      }
      else {
        selected_shape = {type: 'line', x1: x, y1: y, x2: x, y2: y};
        shapes.push(selected_shape);
      }

      redraw();
    }, 100);
  }, false);

  canvas.addEventListener("dblclick", function(e) {
    was_double_click = true;
    const x = e.clientX - canvas.getBoundingClientRect().left,
          y = e.clientY - canvas.getBoundingClientRect().top;

    selected_shape = {type: 'text', x: x, y: y, string: 'test'};
    shapes.push(selected_shape);
  }, false);


  const ctx = canvas.getContext('2d')
  let redraw_timeout = null
  let last_ran = null

  canvas.addEventListener('mousemove', function(e) {
    const x = e.clientX - canvas.getBoundingClientRect().left,
          y = e.clientY - canvas.getBoundingClientRect().top;

    mouse_pos = {x: x, y: y};

    if(selected_shape && selected_shape.type == 'line') {
      selected_shape.x2 = x;
      selected_shape.y2 = y;
    }

    redraw();
  }, false);

  window.addEventListener('keypress', function(e) {
    if(selected_shape && selected_shape.type == 'text') {
      const new_ch = String.fromCharCode(e.which)
      if(new_ch.trim() != '')
        selected_shape.string += new_ch
      redraw()
    }
  }, true);

  window.addEventListener('keydown', function(e) {
    if(selected_shape && selected_shape.type == 'text') {
      if(e.which == 8) // backspace
        selected_shape.string = selected_shape.string.substring(0, selected_shape.string.length - 1)
      else if(e.which == 13) // return
        selected_shape.string += '\n'

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
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
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

        if(mouse_pos && mouse_pos.x > shape.x && mouse_pos.x < shape.x + 100 &&
           mouse_pos.y > shape.y - 20 && mouse_pos.y < shape.y - 20 + 100) {
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.strokeRect(shape.x, shape.y - 20, 100, 100);
        }
      }
    });

    info_strs[0] = `shape count: ${shapes.length}`;
    info_strs.forEach(function(s, index) {
      ctx.font = '10pt sans-serif'
      ctx.textAlign = "left"
      ctx.fillText(s, 10, 10 + index * 20)
    });
  }

  function get_shape_under_mouse() {
  //   for each shape
  //     for each point
  }
})();
