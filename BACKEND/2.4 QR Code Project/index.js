/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

// 1. Use the inquirer npm package to get user input.
import inquirer from "inquirer";
import * as qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      /* Pass your questions in here */
      name: "URL",
      message: "Enter URL Here: ",
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    var qr_svg = qr.image(answers.URL, { type: "png" });
    qr_svg.pipe(fs.createWriteStream("url.png"));
    fs.writeFile("newURL.txt", answers.URL, function (err) {
      if (err) throw err;
    });

    console.log(answers);
  });
