//node fetcher.js http://www.example.edu/ ./index.html
const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const commandLineArg = function() {
  const args = process.argv.slice(2);
  return args;
}
const req = function(args) {
  request(args[0], (error, response, body) =>{
    if(error) {
      console.log(error.message);
      process.exit();
    }
  
    if (response && response.statusCode) {
      console.log("StatusCode: ", response.statusCode);
    }
    let count = body.length;
    fs.access(args[1], (err) => {
      if (err) {
        console.log("Enter valid path of the file");
        process.exit();
      } else {
        fs.writeFile(args[1], body, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        fs.exists(args[1], (isExist) => {
          if (isExist) {
            rl.question(`File ${args[1]} exists. Do you want to overWrite? Press (Y):`, answer => {
              if(answer === 'Y' || answer === 'y'){
                console.log(`Downloaded and saved ${count} bytes to ./index.html`);
                process.exit();
              } else {
                process.exit();
              }
            });
          }
        });
      });
    }
  });
});
}
const args = commandLineArg();
req(args);
