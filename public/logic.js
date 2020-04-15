window.onload = (event) => {
  populationOfAnimalList();
};

populationOfAnimalList = async () => {
  const animals = await getAllAnimals();
  console.log(animals);
  let optionlistAnimals = document.getElementById("animalsList");

  optionlistAnimals.innerHTML = "";

  animals.forEach((animal) => {
    optionlistAnimals.options.add(new Option(animal.species));
  });
};

animalOptionChange = async () => {
  let optionlistAnimals = document.getElementById("animalsList");
  let selectedAnimal = optionlistAnimals.value;

  const animal = await getAnimalBySpecies(selectedAnimal);

  speciesChange = document.getElementById("speciesChange");
  yearsChange = document.getElementById("yearsChange");
  infoChange = document.getElementById("infoChange");

  speciesChange.value = animal.species;
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
  const species = document.getElementById("specificAnimal").value;

  const foundAnimal = await getAnimalBySpecies(species);

  if (foundAnimal === 404) {
    printSpecificAnimal("");
    let infoDiv = document.getElementById("animalInfoText");
    let errorResponse = document.createElement("h3");
    errorResponse.innerHTML = "Kunde inte hitta det djur du söker.";
    infoDiv.appendChild(errorResponse);
  } else {
    printSpecificAnimal(foundAnimal);
  }
};

//GET
// searchForAnimals = () => {
//   const species = document.getElementById("specificAnimal").value;
//   console.log(species);

//   fetch("http://localhost:3000/animals/" + species)
//     .then((response) => {
//       if (response.status === 404) {
//         printSpecificAnimal("");
//         let infoDiv = document.getElementById("animalInfoText");
//         let errorResponse = document.createElement("h3");
//         errorResponse.innerHTML = "Kunde inte hitta det djur du söker.";
//         infoDiv.appendChild(errorResponse);
//       } else {
//         return response.json();
//       }
//     })
//     .then((animal) => {
//       printSpecificAnimal(animal);
//     });
// };

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

  populationOfAnimalList();
};

//PUT
updateAnimal = () => {
  speciesChange = document.getElementById("speciesChange");
  yearsChange = document.getElementById("yearsChange");
  infoChange = document.getElementById("infoChange");

  const updatedAnimal = {
    species: speciesChange.value,
    years: yearsChange.value,
    info: infoChange.value,
  };

  fetch("http://localhost:3000/animals/" + updatedAnimal.species, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedAnimal),
  }).then((response) => {
    console.log(response.status + " från updatePUT");
  });
};

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
