var button = document.querySelector("button");
var thirdList = document.querySelector("ul .list:last-child");
var list = document.getElementsByTagName("li");

list[1].style.color = "green";

thirdList.innerHTML = "Ayam";
thirdList.style.color = "red";

button.style.backgroundColor = "yellow";

var hugeHeading = document.querySelector("h1").classList;

hugeHeading.toggle("huge");
