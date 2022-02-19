const fs = require("fs-extra");
const ejs = require("ejs");
const path = require("path");
const process = require("process");
const chokidar = require('chokidar');
const data = require("./data.json");

const buildPath = path.join(__dirname, "build");
const templatesPath = path.join(__dirname, "templates");
const staticPath = path.join(__dirname, "static");

function getTime() {
  let date = new Date();
  let formedDate = "["
  for (i of [date.getHours(), date.getMinutes(), date.getSeconds()]) {
    if (i < 10) {
      i = "0" + i;
    }
    formedDate += i + ":"
  }
  return `${formedDate.substring(0, formedDate.length - 1)}]`
}

function renderTemplate(templateFileName) {
  ejs.renderFile(path.join(templatesPath, templateFileName), data, (err, html) => {
    if (err) {
      throw err;
    }
    fs.writeFileSync(
      path.join(buildPath, templateFileName.replace("ejs", "html")),
      html
    );
  });
}

function copyStaticFile(staticFileName) {
  fs.copySync(path.join(staticPath, staticFileName), path.join(buildPath, staticFileName))
}

function build() {
  if (fs.existsSync(buildPath)) {
    fs.rmSync(buildPath, { recursive: true });
  }
  fs.mkdirSync("build");
  fs.readdirSync(templatesPath).forEach(renderTemplate);
  fs.readdirSync(staticPath).forEach(copyStaticFile);
  console.log(`${getTime()} Compiled to build directory.`)
}

build();
if(process.argv.includes("-w")) {
  console.log(`${getTime()} Watching source files for changes...`)
  chokidar.watch(["templates", "partials", "static", "data.json"], { ignoreInitial: true}).on("all", (_event, changedFile) => {
    console.log(`${getTime()} Detected change in ${changedFile}. Reloading website...`);
    build();
  });
}