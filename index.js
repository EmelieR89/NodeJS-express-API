const express = require("express");
const app = express();
const port = 3000;

const animals = [
  { id: 1, species: "Marsvin", years: 5, info: "Marvsin kommer från Peru" },
  {
    id: 2,
    species: "Katt",
    years: 20,
    info: "Katter landar oftast på fötterna",
  },
  {
    id: 3,
    species: "Gris",
    years: 15,
    info: "Minigrisar kan väga upp mot 100 kg",
  },
  { id: 4, species: "Får", years: 15, info: "Fårets ungar heter lamm" },
];

app.use(express.json());
app.use(express.static("public"));

app.get("/animals", (req, res) => {
  res.send(animals);
});

app.get("/animals/:species", (req, res) => {
  console.log("Från djur id: " + req.params.species);
  const animalFound = animals.find((animal) => {
    if (animal.species === req.params.species) {
      return true;
    } else {
      return false;
    }
  });
  if (!animalFound) {
    res.status(404).send();
  } else {
    res.send(animalFound);
  }
});

app.post("/animals", (req, res) => {
  animals.push(req.body);
  res.status(201).send();
});

app.listen(port, () => console.log(`Listening to http://localhost:${port}`));
