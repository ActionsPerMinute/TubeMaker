// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
window.$ = window.jQuery = require('jquery');

const clipboard = require('electron').clipboard
const colpatt = new RegExp(/#[0-9,a-f,A-F]{6}/);
const rotpatt = new RegExp(/-?[0-9]+/);
const widpatt = new RegExp(/[0-9]+/);

$('#m45').click(function() {
    var rot = $('#rotation')
    var newrot = rot.val()
    newrot -= 45
    rot.val(newrot)
    refresh()
})

$('#p45').click(function() {
    var rot = $('#rotation')
    var newrot = rot.val()
    newrot -= -45
    rot.val(newrot)
    refresh()
})

/*$('#colpick').on('input', function() {
    refresh()
});*/

$('#colpick').on('change', function() {
    refresh()
});

$('#rotation').on('change', function() {
    refresh()
});

$('#width').on('change', function() {

    refresh()
});

function refresh(){
    var width = $('#width').val()
    var colour = $('#colpick').val()
    if(colour.charAt(0) != '#') colour = '#'+colour
    var rotation =  $('#rotation').val()
    var path = $('#template svg g path')
    var oldpath = path[0].outerHTML;
    if(widpatt.test(width)) var newpath = oldpath.replace(/stroke-width:\d+;/,"stroke-width:"+width+";")
    if(colpatt.test(colour)) var newpath = newpath.replace(/stroke:#[a-f,A-F,0-9]{6};/,"stroke:"+colour+";")
    if(rotpatt.test(rotation)) var newpath = newpath.replace(/rotate\(-?\d+ /,"rotate("+rotation+" ")
    path[0].outerHTML=newpath;
    var svg = $('#template')[0].innerHTML
    clipboard.writeText("data:image/svg+xml;base64,"+window.btoa(svg))
}

$('#picker').click(function() {
    refresh()
})

