fetch("http://localhost:3000/animals")
  .then((response) => {
    return response.json();
  })
  .then((animals) => {
    console.log(animals);
  });

//GET
searchForAnimals = () => {
  const species = document.getElementById("specificAnimal").value;
  console.log(species);

  fetch("http://localhost:3000/animals/" + species)
    .then((response) => {
      if (response.status === 404) {
        printSpecificAnimal("");
        let infoDiv = document.getElementById("animalInfoText");
        let errorResponse = document.createElement("h3");
        errorResponse.innerHTML = "Kunde inte hitta det djur du söker.";
        infoDiv.appendChild(errorResponse);
      } else {
        return response.json();
      }
    })
    .then((animal) => {
      printSpecificAnimal(animal);
    });
};

printSpecificAnimal = (animal) => {
  let speciesName = document.getElementById("species");
  speciesName.innerHTML = animal.species != undefined ? animal.species : "";
  let years = document.getElementById("years");
  years.innerHTML = animal.years != undefined ? animal.years : "";
  let info = document.getElementById("info");
  info.innerHTML = animal.info != undefined ? animal.info : "";
};

//POST
addAnimal = () => {
  let addedAnimalSpecies = document.getElementById("addSpecies");
  let addedAnimalYears = document.getElementById("addYears");
  let addedAnimalInfo = document.getElementById("addInfo");
  let newAnimal = {
    id: 12,
    species: addedAnimalSpecies.value,
    years: addedAnimalYears.value,
    info: addedAnimalInfo.value,
  };

  fetch("http://localhost:3000/animals/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAnimal),
  })
    .then((response) => {
      if (response.status === 201) {
        addedAnimalSpecies.value = "";
        addedAnimalYears.value = "";
        addedAnimalInfo.value = "";
      }
    })
    .catch((error) => {
      console.error("There is an issue, ", error);
    });
};

//PUT

updateAnimal = () => {};

//DELETE
deleteSelectedSpecies = () => {
  let deletedAnimal = document.getElementById("deleteSpecies").value;

  fetch("http://localhost:3000/animals/" + deletedAnimal, {
    method: "DELETE",
    // body: deletedAnimal,
  })
    .then((response) => {
      if ((response.status = 201)) {
        document.getElementById("deleteSpecies").value = "";
        let deleteSuccess = document.createElement("h3");
        deleteSuccess.innerHTML = deletedAnimal + " är nu borttaget.";
        let couldDeleteDiv = document.getElementById("couldDeleteDiv");
        couldDeleteDiv.appendChild(deleteSuccess);
      }
    })
    .catch((error) => {
      console.error("There is an issue: ", error);
    });
};
