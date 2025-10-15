import { productos } from "./data.js";
import { addToCart, getQuantity, updateBadge} from "./carrito.js";

  

window.onload = function() {
  var params = new URLSearchParams(window.location.search);
  var id = Number(params.get("id"));
  var p = productos.find(function(prod) {
      return prod.id === id;
  });

  var cont = document.getElementById("detalleProducto");

  if (!p) {
    cont.innerHTML = "<p>Producto no encontrado</p>";
    return;
  }

  var stock = p.stock - getQuantity(p.id);

  
  var html =
    '<img src="../' + p.img + '" alt="' + p.nombre + '">' +
    '<h2>' + p.nombre + '</h2>' +
    '<p>' + p.descripcion + '</p>' +
    '<p>Precio: $' + p.precio + '</p>' +
    '<p>Stock: <span id="stock">' + stock + '</span></p>' +
    '<button id="btn-add" data-id="' + p.id + '" ' + (stock <= 0 ? "disabled" : "") + '>Agregar al carrito</button>';

  cont.innerHTML = html;



  document.getElementById("btn-add").onclick = function() {
    if (stock <= 0) return;
    addToCart(p.id);
    updateBadge();
    stock--; 
    document.getElementById("stock").textContent = stock;
    if (stock <= 0) {
        this.disabled = true;
    }
  };
};