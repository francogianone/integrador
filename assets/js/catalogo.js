import { productos } from "./data.js";
import { addToCart, getQuantity, updateBadge } from "./carrito.js";

// actualizar stock visible
function actualizarStockVisible(id) {
    var productoData = productos.find(function(p) {
        return p.id === id;
    });
    if (!productoData) return;

    var stockActual = productoData.stock - getQuantity(id);
    var stockElement = document.getElementById('stock-' + id);
    var addButton = document.querySelector(".btn-add[data-id='" + id + "']");

    if (stockElement) {
        stockElement.textContent = stockActual;
    }
    if (addButton) {
        addButton.disabled = stockActual <= 0;
    }
}

window.onload = function() {
  var cont = document.getElementById("catalogo");
  var botonesFiltro = document.querySelectorAll("#filtros-categorias button");
  var productosEnHTML = document.querySelectorAll("#catalogo .producto");

 
  for (var i = 0; i < productosEnHTML.length; i++) {
      var prodDiv = productosEnHTML[i];
      var id = Number(prodDiv.querySelector('.btn-add').dataset.id);
      actualizarStockVisible(id);
  }

  // botones filtro
  for (var j = 0; j < botonesFiltro.length; j++) {
      var btn = botonesFiltro[j];
      btn.onclick = function() {
          
          for (var k = 0; k < botonesFiltro.length; k++) {
              botonesFiltro[k].classList.remove("activo");
          }
          
          this.classList.add("activo");
          var categoria = this.getAttribute("data-cat");

          
          for (var l = 0; l < productosEnHTML.length; l++) {
              var prodDiv = productosEnHTML[l];
              if (categoria === "todos" || prodDiv.dataset.categoria === categoria) {
                  prodDiv.style.display = "block";
              } else {
                  prodDiv.style.display = "none";
              }
          }
      };
  }

  
  cont.onclick = function(e) {
    var btn = e.target.closest(".btn-add");
    if (!btn) return;

    var id = Number(btn.getAttribute("data-id"));
    var productoData = productos.find(function(p) {
        return p.id === id;
    });
    var stockActual = productoData.stock - getQuantity(id);

    if (stockActual > 0) {
        addToCart(id);
        updateBadge();
        actualizarStockVisible(id);
    }
  };
};