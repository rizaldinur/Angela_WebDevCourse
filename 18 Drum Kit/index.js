//pemanggilan listener dg fungsi terpisah
for (var i = 0; i < document.querySelectorAll("button").length; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", handleClick);
}

function handleClick() {
  alert("I got clicked ");
}

//pemanggilan listener function secara anonimus
// document.querySelector("button").addEventListener("click", function () {
//   alert("I got clicked ");
// });
