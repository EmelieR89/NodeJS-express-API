const fs = require("fs");
const rawObject = fs.readFileSync("./data.json");
const animals = JSON.parse(rawObject);
let idIndex = animals.length;

writeToFile = () => {
  fs.writeFileSync("./data.json", JSON.stringify(animals), (error) =>
    console.log(error)
  );
};

findAnimal = (speciesToFind) => {
  return animals.find((animal) => {
    if (animal.species === speciesToFind) {
      return animal;
    } else {
      return false;
    }
  });
};

module.exports = {
  getWholeObject: () => {
    return animals;
  },

  getBySpecies: (species) => {
    let result = findAnimal(species);
    return result;
  },

  addAnimal: (newAnimal) => {
    newAnimal.id = ++idIndex;
    animals.push(newAnimal);
    writeToFile();
  },

  updateAnimal: (previousSpecies, updatedAnimal) => {
    let result = findAnimal(previousSpecies);
    if (!result) {
      return result;
    } else {
      result.species = updatedAnimal.newSpecies;
      result.years = updatedAnimal.years;
      result.info = updatedAnimal.info;

      writeToFile();
      return result;
    }
  },

  deleteAnimal: (speciesToDelete) => {
    let result = findAnimal(speciesToDelete);
    if (!result) {
      return result;
    } else {
      const index = animals.indexOf(result);
      animals.splice(index, 1);

      writeToFile();
      return result;
    }
  },
};
