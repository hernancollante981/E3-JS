const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/",
  },
  {
    id: 2,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Jamon", "Morron", "Aceitunas"],
    imagen: "./img/",
  },
  {
    id: 3,
    nombre: "pizza 4 quesos",
    precio: 1000,
    ingredientes: ["Muzzarella", "Roquefort", "Parmesano", "Fontina "],
    imagen: "./img/",
  },
  {
    id: 4,
    nombre: "pizza de Champiñones ",
    precio: 1200,
    ingredientes: ["Muzzarella", "Tomate", "Champiñones"],
    imagen: "./img/",
  },
];

const inputTxt = document.getElementById("input-txt");
const btnSubmit = document.querySelector("#btn-submit");
const form = document.getElementById("form");
const display = document.querySelector(".display");
const body = document.querySelector("body");

let currentPizza; // Variable para almacenar temporalmente la pizza actual

// Función para imprimir la información de la pizza en pantalla
function displayPizzaInfo(selectedPizza) {
  const { nombre, precio, ingredientes, imagen } = selectedPizza;

  body.style.backgroundImage = `url(${imagen})`;

  const pizzaImage = document.createElement("img");
  pizzaImage.src = imagen;
  pizzaImage.classList.add("foto");

  const pizzaInfoContainer = document.createElement("div");
  pizzaInfoContainer.classList.add("display-info");

  const pizzaNameHeader = document.createElement("h2");
  pizzaNameHeader.textContent = nombre;
  pizzaNameHeader.classList.add("titulo");

  const pizzaIngredientsParagraph = document.createElement("p");
  pizzaIngredientsParagraph.innerHTML = `<b>Ingredientes:</b> ${ingredientes
    .slice(0, -1)
    .join(", ")} y ${ingredientes.slice(-1)}.`;
  pizzaIngredientsParagraph.classList.add("ingredientes");

  const pizzaPriceParagraph = document.createElement("p");
  pizzaPriceParagraph.textContent = `Valor: $ ${precio.toFixed(2)},-`;
  pizzaPriceParagraph.classList.add("precio");

  pizzaInfoContainer.appendChild(pizzaNameHeader);
  pizzaInfoContainer.appendChild(pizzaIngredientsParagraph);
  pizzaInfoContainer.appendChild(pizzaPriceParagraph);

  display.innerHTML = "";
  display.appendChild(pizzaImage);
  display.appendChild(pizzaInfoContainer);
}

// Función para buscar una pizza por su ID
function findPizzaById(id) {
  return pizzas.find((pizza) => pizza.id === id) || 0;
}

// Función para mostrar un mensaje de error
function displayError(message) {
  display.innerHTML = "";
  const errorContainer = document.createElement("div");
  errorContainer.textContent = message;
  errorContainer.classList.add("error");

  display.appendChild(errorContainer);
  body.style.backgroundImage = "url('./img/caja-vacia.jpg')";
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
}

// Función para manejar el envío del formulario
function handleSubmitForm(event) {
  event.preventDefault();
  const inputNumber = parseInt(inputTxt.value);
  const hasInput = inputTxt.value !== "";

  if (hasInput) {
    const foundPizza = findPizzaById(inputNumber);

    if (foundPizza) {
      displayPizzaInfo(foundPizza);
      localStorage.setItem("ultimaPizza", JSON.stringify(foundPizza));
    } else {
      displayError("El número de pizza ingresado no existe");
    }
  } else {
    displayError("Debe ingresar un número");
  }
  inputTxt.value = "";
}

window.addEventListener("DOMContentLoaded", () => {
  const lastPizza = JSON.parse(localStorage.getItem("ultimaPizza"));
  if (lastPizza) {
    body.style.backgroundImage = `url(${lastPizza.imagen})`;
    displayPizzaInfo(lastPizza);
  }
});

form.addEventListener("submit", handleSubmitForm);
