document.getElementById("back-button").onclick = function () {
   window.location.href = "../index.html";
};

function Solve(val) {
   document.getElementById('res').addEventListener('keydown', (event) => {
      if (event.key === "Enter") {
         event.preventDefault();
         eval(document.getElementById('res').value);
         document.getElementById('res').value = num2;
      }
   });

   var v = document.getElementById('res');

   v.value += val;
}

function Result() {
   var num1 = document.getElementById('res').value;
   var num2 = eval(num1);
   document.getElementById('res').value = num2;
}
function Clear() {
   var inp = document.getElementById('res');
   inp.value = '';
}
function Back() {
   var ev = document.getElementById('res');
   ev.value = ev.value.slice(0, -1);
}