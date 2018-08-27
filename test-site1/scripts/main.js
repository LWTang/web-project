var textarea = document.getElementById('code');
var reset = document.getElementById('reset');
var solution = document.getElementById('solution');
var code = textarea.value;
var output = document.querySelector('.output');

function drawOutput() {
  output.innerHTML = textarea.value;
}

reset.addEventListener("click", function() {
  textarea.value = '<em>This is my text.</em>';
  drawOutput();
})

textarea.addEventListener("input", drawOutput);
window.addEventListener("load", drawOutput);