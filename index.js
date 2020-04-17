const express = require("express");
const app = express();
const handler = require("./handler");
const port = 3000;

//Parse request body as JSON
app.use(express.json());

app.use(express.static("public"));

app.get("/animals", (req, res) => {
  res.send(handler.getWholeObject());
});

app.get("/animals/:species", (req, res) => {
  let animalFound = handler.getBySpecies(req.params.species);
  if (!animalFound) {
    res.status(404).send();
  } else {
    res.send(animalFound);
  }
});

app.post("/animals", (req, res) => {
  handler.addAnimal(req.body);
  res.status(201).send();
});

app.put("/animals/:species", (req, res) => {
  const animalFound = handler.updateAnimal(req.body);

  if (!animalFound) {
    res.status(404).send();
  } else {
    res.send(animalFound);
  }
});

app.delete("/animals/:species", (req, res) => {
  const animalFound = handler.deleteAnimal(req.params.species);

  if (!animalFound) {
    res.status(404).send();
  } else {
    res.send(animalFound);
  }
});

app.listen(port, () => console.log(`Listening to http://localhost:${port}`));
