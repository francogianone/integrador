import { productos } from "./data.js";
import { addToCart, getQuantity, updateBadge } from "./carrito.js";

//actualizar el stock visible
function actualizarStockVisible(id) {
    var productoData = productos.find(function(p) {
        return p.id === id;
    });
    if (!productoData) return;

    var stockActual = productoData.stock - getQuantity(id);
    var stockElement = document.getElementById("stock-" + id);
    var addButton = document.querySelector(".btn-add[data-id='" + id + "']");

    if (stockElement) {
        stockElement.textContent = stockActual;
    }
    if (addButton) {
        addButton.disabled = stockActual <= 0;
    }
}


window.onload = function() {
  var cont = document.getElementById("destacados");
  


  var botones = cont.querySelectorAll(".btn-add");
  for (var i = 0; i < botones.length; i++) {
      var id = Number(botones[i].dataset.id);
      actualizarStockVisible(id);
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