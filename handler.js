const fs = require("fs");
const rawObject = fs.readFileSync("./data.json");
const animals = JSON.parse(rawObject);

writeToFile = () => {
  fs.writeFileSync("./data.json", JSON.stringify(animals), (error) =>
    console.log(error)
  );
};

findAnimal = (speciesToFind) => {
  return animals.find((animal) => {
    if (animal.species === speciesToFind) {
      console.log(animal.species + " från find");
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
    animals.push(newAnimal);
    writeToFile();
  },

  updateAnimal: (updatedAnimal) => {
    let result = findAnimal(updatedAnimal.species);
    if (!result) {
      return result;
    } else {
      result.species = updatedAnimal.species;
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
