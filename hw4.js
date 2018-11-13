const express = require("express");
const app = express();
const port = "3000";

function printGitbash(req, res) {
  console.log(`${req.method} ${req.url}${Object.keys(req.headers)
    .map(k => `${k}: ${req.headers[k]}`)
    .join("\n")}
`);
  req.on("data", d => console.log(d.toString()));
}

app.get("/", (req, res) => {
  printGitbash(req);
  res.write("This is main page.");
  res.end();
});

app.get("/board", (req, res) => {
  printGitbash(req);
  res.write("This is board page.");
  res.end();
});

app.post("/board", (req, res) => {
  printGitbash(req);
  res.write("This is board write page.");
  res.end();
});

app.use((req, res, next) => {
  printGitbash(req);
  //next(createError(404));
  throw new Error("404 not found");
});
app.use((err, req, res, next) => {
  //res.status(404).send(err.message);
  //res.status(404).send("404 not found");
  res.statusCode = 404;
  res.send(err.message);
});

app.listen(port, () => console.log(`server online`));
