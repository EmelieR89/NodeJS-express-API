fetch("http://localhost:3000/animals")
  .then((response) => {
    return response.json();
  })
  .then((animals) => {
    console.log(animals);
  });

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
