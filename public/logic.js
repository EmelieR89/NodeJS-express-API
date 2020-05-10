window.onload = (event) => {
  populationOfAnimalList();
};

//Population of the dropdownlist
populationOfAnimalList = async () => {
  const animals = await getAllAnimals();
  let optionlistAnimals = document.getElementById("animalsList");

  optionlistAnimals.innerHTML = "";

  animals.forEach((animal) => {
    optionlistAnimals.options.add(new Option(animal.species));
  });
};

//Runs when user changes animal in dropdown
animalOptionChange = async () => {
  let optionlistAnimals = document.getElementById("animalsList");
  let selectedAnimal = optionlistAnimals.value;

  const animal = await getAnimalBySpecies(selectedAnimal);

  yearsChange = document.getElementById("yearsChange");
  infoChange = document.getElementById("infoChange");

  yearsChange.value = animal.years;
  infoChange.value = animal.info;
};

//GET all animals
getAllAnimals = async () => {
  let result;
  await fetch("http://localhost:3000/animals").then(async (response) => {
    result = await response.json();
  });
  return result;
};

//Check if animal already exists
checkIfExists = async (elementValue) => {
  const animalList = await getAllAnimals();
  let doesItExist = false;

  animalList.map((x) => {
    if (x.species === elementValue) {
      doesItExist = true;
    }
  });
  if (doesItExist) {
    alert("Species already exist");
  }
  return doesItExist;
};

//GET specific by species
getAnimalBySpecies = async (species) => {
  let result;
  await fetch("http://localhost:3000/animals/" + species).then(
    async (response) => {
      if (response.status === 404) {
        result = response.status;
      } else {
        result = await response.json();
      }
    }
  );
  return result;
};

// When user searches for specific animal
searchForAnimal = async () => {
  const species = document.getElementById("specificAnimal");
  let errorResponse = document.getElementById("errorResponse");

  const foundAnimal = await getAnimalBySpecies(species.value);

  if (foundAnimal === 404) {
    printSpecificAnimal("");
    species.value = "";

    errorResponse.innerHTML = "Kunde inte hitta det djur du söker.";
  } else {
    printSpecificAnimal(foundAnimal);
    species.value = "";
    errorResponse.innerHTML = "";
  }
};

printSpecificAnimal = (animal) => {
  let speciesName = document.getElementById("species");
  speciesName.innerHTML = animal.species != undefined ? animal.species : "";
  let years = document.getElementById("years");
  years.innerHTML = animal.years != undefined ? animal.years : "";
  let info = document.getElementById("info");
  info.innerHTML = animal.info != undefined ? animal.info : "";
};

//POST add new animal

addAnimal = async () => {
  let addedAnimalSpecies = document.getElementById("addSpecies");
  let addedAnimalYears = document.getElementById("addYears");
  let addedAnimalInfo = document.getElementById("addInfo");
  let newAnimal = {
    id: NaN,
    species: addedAnimalSpecies.value,
    years: addedAnimalYears.value,
    info: addedAnimalInfo.value,
  };

  const doesAnimalExist = await checkIfExists(addedAnimalSpecies.value);
  if (doesAnimalExist) {
    return;
  }

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

  populationOfAnimalList();
};

//PUT update animal
updateAnimal = async () => {
  previousSpecies = document.getElementById("animalsList");
  speciesChange = document.getElementById("animalToUpdate");
  yearsChange = document.getElementById("yearsChange");
  infoChange = document.getElementById("infoChange");

  const doesAnimalExist = await checkIfExists(speciesChange.value);
  if (doesAnimalExist) {
    return;
  }

  const updatedAnimal = {
    previousSpecies: previousSpecies.value,
    newSpecies: speciesChange.value,
    years: yearsChange.value,
    info: infoChange.value,
  };

  fetch("http://localhost:3000/animals/" + updatedAnimal.previousSpecies, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedAnimal),
  })
    .then((response) => {
      console.log(response.status);
      speciesChange.value = "";
      yearsChange.value = "";
      infoChange.value = "";
    })
    .catch((error) => {
      console.error("There is an issue " + error);
    });
  populationOfAnimalList();
};

//DELETE animal
deleteSelectedSpecies = () => {
  let deletedAnimal = document.getElementById("deleteSpecies").value;

  fetch("http://localhost:3000/animals/" + deletedAnimal, {
    method: "DELETE",
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
