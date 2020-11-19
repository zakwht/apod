const fs = require("fs");
const { exit } = require("process");
const exec = require("child_process").exec;
let manifest = require("./public/manifest.json");
let version = require("./package.json").version;

if (manifest.version !== version) {
  console.log("Sync build version: ", version);
  manifest.version = require("./package.json").version;

  fs.writeFile(
    "./public/manifest.json",
    JSON.stringify(manifest, null, 2),
    (err) => {
      if (err) console.error(err);
    }
  );
}

[
  "npx eslint 'src/**/*{.js,.ts,.tsx}'",
  "npx csslint-next src/**/*.css --ignore=order-alphabetical,outline-none,adjoining-classes,box-model,tabs --quiet"
].forEach((command) =>
  exec(command, (_, stdout) => {
    if (stdout) {
      console.log(stdout);
      exit(-1);
    }
  })
);
