const express = require("express");
const app = express();
const code = `Welcome to waste bin. use the commamnds in the top right corner to create a new file.
This is another line for multi line display`;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const Document = require("./models/Document");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/wastebin", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.get("/", (request, response) => {
  response.render("code-display", {
    code,
    // lineNumbers:
  });
});
app.get("/new", (request, response) => {
  //   response.render("new", {});
  response.render("new");
});
app.get("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const document = await Document.findById(id);
    response.render("code-display", { code: document.value });
  } catch (e) {
    response.redirect("/");
  }
});
app.post("/save", async (request, response) => {
  const value = req.body.value;
  try {
    const document = await Document.create({
      value,
    });
    response.redirect(`/${document.id}`);
  } catch (err) {
    response.render("new", { value });
  }
});
app.listen(3000);
