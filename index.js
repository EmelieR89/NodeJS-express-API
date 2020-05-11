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
  const doesItExist = checkIfExists(req.body.species);

  if (doesItExist) {
    res.status(400).send("That species already exists");
    return;
  }

  handler.addAnimal(req.body);
  res.status(201).send();
});

app.put("/animals/:species", (req, res) => {
  const previousSpecies = req.params.species;

  const doesItExist = checkIfExists(req.body.newSpecies);

  if (doesItExist) {
    res.status(400).send("That species already exists");
    return;
  }

  const animalFound = handler.updateAnimal(previousSpecies, req.body);

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

//Check if animal already exists
checkIfExists = (speciesToCheck) => {
  const animalList = handler.getWholeObject();
  let doesItExist = false;
  animalList.map((x) => {
    if (x.species === speciesToCheck) {
      doesItExist = true;
    }
  });
  return doesItExist;
};

app.listen(port, () => console.log(`Listening to http://localhost:${port}`));
