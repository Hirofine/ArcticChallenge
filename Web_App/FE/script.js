$(document).ready(function () {
  console.log("please be working");
  var res;
  var test = 10;
  $.getJSON('https://jsonplaceholder.typicode.com/todos', function(data){
    document.getElementById("json").textContent = JSON.stringify(data, undefined, 2);
  });
  
});