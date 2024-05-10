var button = document.querySelector("button");
var thirdList = document.querySelector("ul .list:last-child");
var list = document.getElementsByTagName("li");

list[1].style.color = "green";

thirdList.innerHTML = "Ayam";
thirdList.style.color = "red";

button.style.backgroundColor = "yellow";

var heading = document.querySelector("h1");

heading.classList.toggle("huge");
heading.innerHTML = "<em>Hello</em>";

var link = document.querySelector("a");
link.setAttribute("href", "https://www.twitter.com/");
