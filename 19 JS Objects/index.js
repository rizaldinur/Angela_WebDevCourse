//membuat objek bellBoy1
var bellBoy1 = {
  name: "Timmy",
  age: 19,
  hasWorkPermit: true,
  languages: ["English", "French"],
};

console.log("Hello, the name's " + bellBoy1.name);

//constructor function objek BellBoy
function BellBoy(name, age, hasWorkPermit, languages) {
  this.name = name;
  this.age = age;
  this.hasWorkPermit = hasWorkPermit;
  this.languages = languages;
}

//membuat(initialize) objeknya
var bellBoy2 = new BellBoy("Timmy", 19, true, ["French", "English"]);
console.log(bellBoy2.name);

//constructor dan methods object
function HouseKeeper(name, age, skills) {
  this.name = name;
  this.age = age;
  this.skills = skills;

  //methods, what object can Do
  this.cleaning = function () {
    console.log("Cleaning in progess...");
  };
}

var houseKeeper1 = new HouseKeeper("Stella", 19, ["Clean"]);
houseKeeper1.cleaning();
