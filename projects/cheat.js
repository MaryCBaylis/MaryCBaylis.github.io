var colorArray = ["redbox", "bluebox", "orangebox", "greenbox", "purplebox"];
var idArray = ["cb1", "cb2", "cb3", "cb4", "cb5", "cb6" , "cb7", "cb8"];

function randomColor(color, id) {
    for (var i in id) {
        var colorSample = color[Math.round(Math.random() * (color.length - 1))];
        console.log(id[i] + ": " + colorSample)
        document.getElementById(id[i]).className += " " + colorSample;
        console.log(document.getElementById(id[i]).className);
    }
}

window.onload = function() {
  randomColor(colorArray, idArray);
};