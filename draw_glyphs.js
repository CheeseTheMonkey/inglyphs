$( function () {
  var glyph_coords = [
    [50,10],
    [15,30],
    [85,30],
    [33,40],
    [67,40],
    [50,50],
    [33,60],
    [67,60],
    [15,70],
    [85,70],
    [50,90]
  ];
  
  var glyph_list = [];
  var glyph_list_canvas = ['#last_1','#last_2','#last_3','#last_4'];
  
  function draw_glyph(context, glyph, scale, color) {
    scale = scale || 1;
    color = color || "#ffffff";
    context.clearRect(0,0,context.canvas.width, context.canvas.height);
    for (var i = 0; i < glyph_coords.length; i++) {
      context.beginPath();
      context.arc(glyph_coords[i][0]*scale, glyph_coords[i][1]*scale, 2*scale, 0, 2*Math.PI);
      context.strokeStyle = color
      context.lineWidth = scale;
      context.stroke();
    }
    if (glyph.vertices.length > 1) {
      context.beginPath();
      context.moveTo(glyph_coords[glyph.vertices[0]][0]*scale, glyph_coords[glyph.vertices[0]][1]*scale);
      for (var i = 1; i < glyph.vertices.length; i++) {
        context.lineTo(glyph_coords[glyph.vertices[i]][0]*scale, glyph_coords[glyph.vertices[i]][1]*scale);
      }
      context.lineWidth = 3*scale;
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.strokeStyle = color;
      context.stroke();
    }
  }
  
  var canvas = $('#main_glyph_canvas')[0];
  var main_context = canvas.getContext("2d");
  draw_glyph(main_context, glyphs['calibration'], 4);
  
  for (var key in glyphs) {
    var g = document.createElement('div');
    g.id = key;
    g.className = "glyph_container";
    var c = document.createElement('canvas');
    c.id = "glyph_" + key;
    c.className = 'glyph';
    c.width = 100;
    c.height = 100;
    g.appendChild(c);
    g.appendChild(document.createTextNode(glyphs[key].name));
    document.getElementById('glyphs').appendChild(g);
    context = c.getContext("2d");
    draw_glyph(context, glyphs[key], 1);
  }
  
  // TODO allow clicking canvas to push glyph to main canvas
  
  $('#glyphs .glyph_container').click(function() {
    var old_selected = $('#glyphs .glyph_container.selected')[0];
  
    if (old_selected) {
      $(old_selected).removeClass('selected');
      draw_glyph($(old_selected).children('canvas')[0].getContext("2d"), glyphs[$(old_selected).attr('id')], 1);
    }
  
    // highlight
    $(this).addClass('selected');
    draw_glyph($(this).children('canvas')[0].getContext("2d"), glyphs[$(this).attr('id')], 1, "#FEC80C");
   
    console.log($(this).attr('id'));
    glyph_list.unshift($(this).attr('id'));
    console.log("added to glyph_list, it's now "+glyph_list);
    while (glyph_list.length > 5) {
      glyph_list.pop()
    }
    
    draw_glyph(main_context, glyphs[$(this).attr('id')], 4);
    $('#main_glyph h2').text(glyphs[$(this).attr('id')].name);
  
    for (var i = 1; i < glyph_list.length; i++) {
      draw_glyph($(glyph_list_canvas[i-1])[0].getContext("2d"), glyphs[glyph_list[i]]);
      $(glyph_list_canvas[i-1]).parent().children('span').text(glyphs[glyph_list[i]].name);
    }
  });
});
