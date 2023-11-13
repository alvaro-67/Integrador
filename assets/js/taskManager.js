document.addEventListener("DOMContentLoaded", function (event) {
    let container = document.getElementById("ToDo");
    
});

function Agregar() {
    var titulo = document.getElementById("titulo").value;
    if (titulo.trim() !== "") {
      var newCard = document.createElement("div");
      newCard.className = "card";
      newCard.draggable = true; // Hace que la tarjeta sea arrastrable
      newCard.setAttribute("ondragstart", "Drag(event)");
      newCard.innerHTML = `
        <span>
          <div style="display: inline-flex;width: 100%;">
            <i class="fa-solid fa-pen" onclick="Editar(this)"></i>
            <i class="fa-solid fa-floppy-disk" onclick="Guardar(this)" style="display: none;"></i>
            <i class="fa-solid fa-xmark" onclick="Eliminar(this)"></i>
          </div>
          <input class="title-readonly" type="text" readonly value="${titulo}">
          <div style="display: inline-flex;">
            <i class="fa-solid fa-circle-chevron-left" onclick="MoverIzquierda(this)"></i>
            <i class="fa-solid fa-circle-chevron-right" onclick="MoverDerecha(this)"></i>
          </div>
        </span>
      `;
      document.getElementById("tareas-por-hacer").appendChild(newCard);
      document.getElementById("titulo").value = "";
    }
  }

  function Editar(icon) {
    var card = icon.closest(".card");
    card.querySelector(".title-readonly").readOnly = false;
    card.querySelector(".title-readonly").focus();
    icon.style.display = "none";
    card.querySelector(".fa-floppy-disk").style.display = "inline-block";
  }

  function Guardar(icon) {
    var card = icon.closest(".card");
    card.querySelector(".title-readonly").readOnly = true;
    icon.style.display = "none";
    card.querySelector(".fa-pen").style.display = "inline-block";
  }

  function Eliminar(icon) {
    var card = icon.closest(".card");
    card.remove();
  }

  function Drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function AllowDrop(ev) {
    ev.preventDefault();
  }

  function Drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedCard = document.getElementById(data);
    var destinationSection = ev.target.closest(".section");

    if (destinationSection) {
      destinationSection.appendChild(draggedCard);
    }
  }

  function MoverIzquierda(icon) {
    var card = icon.closest(".card");
    var currentSection = card.closest(".section");
    var previousSection = currentSection.previousElementSibling;

    if (previousSection) {
      previousSection.appendChild(card);
    }
  }

  function MoverDerecha(icon) {
    var card = icon.closest(".card");
    var currentSection = card.closest(".section");
    var nextSection = currentSection.nextElementSibling;

    if (nextSection) {
      nextSection.appendChild(card);
    }
  }