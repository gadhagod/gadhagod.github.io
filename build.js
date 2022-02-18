const fs = require("fs-extra");
const ejs = require("ejs");
const data = require("./data.json");
const path = require("path");

const buildPath = path.join(__dirname, "build");
const templatesPath = path.join(__dirname, "templates");
const staticPath = path.join(__dirname, "static");

if (fs.existsSync(buildPath)) {
  fs.rmSync(buildPath, { recursive: true });
}
fs.mkdirSync("build");

// render templates
fs.readdirSync(templatesPath).forEach((templateFileName) => {
  ejs.renderFile(path.join(templatesPath, templateFileName), data, (err, html) => {
    if (err) {
      throw err;
    }
    fs.writeFileSync(
      path.join(buildPath, templateFileName.replace("ejs", "html")),
      html
    );
  });
});

// copy static files
fs.readdirSync(staticPath).forEach((staticFileName) => {
  fs.copySync(path.join(staticPath, staticFileName), path.join(buildPath, staticFileName))
})