const fs = require("fs-extra");
const ejs = require("ejs");
const path = require("path");
const process = require("process");
const chokidar = require("chokidar");
const runDevServer = require("./devtools/server");
const open = require('open');

const data = require("./data.json");
const buildPath = path.join(__dirname, "build");
const templatesPath = path.join(__dirname, "templates");
const staticPath = path.join(__dirname, "static");

function getTime() {
  let date = new Date();
  let formedDate = "[";
  for (i of [date.getHours(), date.getMinutes(), date.getSeconds()]) {
    if (i < 10) {
      i = "0" + i;
    }
    formedDate += i + ":";
  }
  return `${formedDate.substring(0, formedDate.length - 1)}]`;
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
  fs.copySync(path.join(staticPath, staticFileName), path.join(buildPath, staticFileName));
}


function writeTimeStamp() {
  fs.writeFileSync(path.join(buildPath, "timestamp.txt"), Math.round((new Date()).getTime() / 1000).toString());
}

function buildDevtools() {
  fs.appendFileSync(path.join(buildPath, "js", "index.js"), `\n\n// Hot reloads\n${fs.readFileSync(path.join(__dirname, "devtools", "hotReload.js"))}`);
  writeTimeStamp();
}

function build() {
  if (fs.existsSync(buildPath)) {
    fs.rmSync(buildPath, { recursive: true });
  }
  fs.mkdirSync("build");
  fs.readdirSync(templatesPath).forEach(renderTemplate);
  fs.readdirSync(staticPath).forEach(copyStaticFile);
  console.log(`${getTime()} Compiled to build directory.`);
}

if(process.argv.includes("-h") || process.argv.includes("--help")) {
  console.log();
  console.log("Aarav Borthakur's Website");
  console.log();
  console.log("Usage:");
  console.log();
  console.log("    node build [options]");
  console.log();
  console.log("Options:");
  console.log("    -h, --help        Print help message")
  console.log("    -d, --dev         Run development mode (hot reloads & file watching)")
  console.log("    -o, --open        Open preview after first build")
  console.log();
  process.exit();
}

build();
if(process.argv.includes("-d") || process.argv.includes("--dev")) {
  writeTimeStamp();
  runDevServer();
  console.log(`${getTime()} Watching source files for changes...`);
  fs.appendFileSync(path.join(buildPath, "js", "index.js"), `\n\n// Hot reloads\n${fs.readFileSync(path.join(__dirname, "devtools", "hotReload.js"))}`);
  chokidar.watch(["templates", "partials", "static", "data.json", "util/hotReload.js"], { ignoreInitial: true }).on("all", (_event, changedFile) => {
    console.log(`${getTime()} Detected change in ${changedFile}. Reloading website...`);
    build();
    buildDevtools();
  });
}

if(process.argv.includes("-o") || process.argv.includes("--open")) {
  open(path.join(__dirname, "build", "index.html"));
}