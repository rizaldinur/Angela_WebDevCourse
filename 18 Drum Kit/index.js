//pemanggilan listener dg fungsi terpisah
// for (var i = 0; i < document.querySelectorAll("button").length; i++) {
//   document.querySelectorAll("button")[i].addEventListener("click", handleClick);
// }

// function handleClick() {
//   alert("I got clicked ");
// }

//pemanggilan listener function secara anonimus
// document.querySelector("button").addEventListener("click", function () {
//   alert("I got clicked ");
// });

//Play drum sounds

//on Mouse click on button
var numberOfDrums = document.querySelectorAll(".drum").length;
for (var i = 0; i < numberOfDrums; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    // drumSounds = new Audio("./sounds/crash.mp3");
    // drumSounds.play();
    // this.style.color = "white";
    var drumType = this.textContent;
    makeSound(drumType);
    buttonAnimation(drumType);
  });
}

//on Keyboard pressed
document.addEventListener("keydown", function (event) {
  // alert("Keyboard is pressed");
  makeSound(event.key);
  buttonAnimation(event.key);
});

function makeSound(key) {
  switch (key) {
    case "w":
      var drumSounds = new Audio("./sounds/tom-1.mp3");
      drumSounds.play();
      break;
    case "a":
      var drumSounds = new Audio("./sounds/tom-2.mp3");
      drumSounds.play();
      break;
    case "s":
      var drumSounds = new Audio("./sounds/tom-3.mp3");
      drumSounds.play();
      break;
    case "d":
      var drumSounds = new Audio("./sounds/tom-4.mp3");
      drumSounds.play();
      break;
    case "j":
      var drumSounds = new Audio("./sounds/crash.mp3");
      drumSounds.play();
      break;
    case "k":
      var drumSounds = new Audio("./sounds/snare.mp3");
      drumSounds.play();
      break;
    case "l":
      var drumSounds = new Audio("./sounds/kick-bass.mp3");
      drumSounds.play();
      break;
  }
}

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}
