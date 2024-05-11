//buat generator angka random
var randomNumber = [
  Math.floor(Math.random() * 6) + 1,
  Math.floor(Math.random() * 6) + 1,
];

//player 1 image to show dice based on randomNumber generated
//ambil objek dice 1
var dice1 = document.querySelector(".img1");

//ganti gambar dice(1-6) sesuai dengan randomNumber1

//atur sumber gambar berdasar randomNumber1
var imgSrc1 = "./images/dice" + randomNumber[0].toString() + ".png";

//ganti atribut sumber gambar berdasarkan sumber randomNumber1
dice1.setAttribute("src", imgSrc1);

// DADU KE-2
// buat generator angka random
// var randomNumber2 = Math.floor(Math.random() * 6) + 1;

//player 2 image to show dice based on randomNumber generated
//ambil objek dice 2
var dice2 = document.querySelector(".img2");

//ganti gambar dice(1-6) sesuai dengan randomNumber2

//atur sumber gambar berdasar randomNumber2
var imgSrc2 = "./images/dice" + randomNumber[1].toString() + ".png";

//ganti atribut sumber gambar berdasarkan sumber randomNumber2
dice2.setAttribute("src", imgSrc2);

//MENENTUKAN PEMENANG

//ganti h1 berdasar pemenangnya
//ambil h1
var heading = document.querySelector("h1");

//jika angka dadu p1 > p2
if (randomNumber[0] > randomNumber[1]) {
  heading.textContent = "🚩Player 1 Wins!";
}
//jika angka dadu p2 > p1
else if (randomNumber[0] < randomNumber[1]) {
  heading.textContent = "Player 2 Wins!🚩";
} else {
  heading.textContent = "Draw!";
}
