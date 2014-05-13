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
]

function draw_glyph(context, glyph, scale) {
  scale = scale || 1;
  context.clearRect(0,0,context.canvas.width, context.canvas.height)
  for (var i = 0; i < glyph_coords.length; i++) {
    context.beginPath();
    context.arc(glyph_coords[i][0]*scale, glyph_coords[i][1]*scale, 2*scale, 0, 2*Math.PI);
    context.strokeStyle = '#ffffff';
    context.lineWidth = scale;
    context.stroke();
  }
  if (glyph.vertices.length > 1) {
    context.beginPath()
    context.moveTo(glyph_coords[glyph.vertices[0]][0]*scale, glyph_coords[glyph.vertices[0]][1]*scale);
    for (var i = 1; i < glyph.vertices.length; i++) {
      context.lineTo(glyph_coords[glyph.vertices[i]][0]*scale, glyph_coords[glyph.vertices[i]][1]*scale);
    }
    context.lineWidth = 3*scale;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.strokeStyle = '#ffffff';
    context.stroke();
  }
}

var canvas = document.getElementById("main_glyph_canvas");
var context = canvas.getContext("2d");
glyphs.forEach( function(glyph) {
  draw_glyph(context, glyph, 4)
});