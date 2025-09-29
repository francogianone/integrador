import { productos } from "./data.js";

var CART_KEY = "miTienda_cart_v1";

// gestion carrito

export function getCart() {
  var data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateBadge();
}

export function addToCart(id) {
  var cart = getCart();
  var item = cart.find(function(i) {
      return i.id === id;
  });

  if (item) {
    item.cantidad += 1;
  } else {
    cart.push({ id: id, cantidad: 1 });
  }
  saveCart(cart);
}

export function getQuantity(id) {
  var cart = getCart();
  var item = cart.find(function(i) {
      return i.id === id;
  });
  return item ? item.cantidad : 0;
}

function getCartCount() {
    var cart = getCart();
    var sum = 0;
    for (var i = 0; i < cart.length; i++) {
        sum += cart[i].cantidad;
    }
    return sum;
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateBadge();
}

export function updateBadge() {
  var badge = document.getElementById("cart-count-badge");
  if (!badge) return;
  badge.textContent = getCartCount();
}

// renderizado

function mostrarPaginaCarrito() {
  var cont = document.getElementById("carritoContenido");
  if (!cont) return; 

  var cart = getCart();
  if (cart.length === 0) {
    cont.innerHTML = "<img id='carrito' src='../assets/img/favicon.png' alt='Carrito vacío'><p id='p-carrito-vacio'>Tu carrito está vacío</p>";
    return;
  }

  var total = 0;
  var totalItems = 0;
  var html = "<table><thead><tr><th>Imagen</th><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead><tbody>";

  
  for (var i = 0; i < cart.length; i++) {
      var item = cart[i];
      var p = productos.find(function(prod) {
          return prod.id === item.id;
      });
      if (!p) continue; 

      var sub = p.precio * item.cantidad;
      total += sub;
      totalItems += item.cantidad;

      
      html += '<tr>' +
          '<td><img src="../' + p.img + '" alt="' + p.nombre + '"></td>' +
          '<td>' + p.nombre + '<br><small>ID: ' + p.id + '</small></td>' +
          '<td>$' + p.precio + '</td>' +
          '<td>' + item.cantidad + '</td>' +
          '<td>$' + sub + '</td>' +
        '</tr>';
  }

  html += "</tbody></table>";
  html += '<div class="resumen">' +
      '<h3>Resumen de compra</h3>' +
      '<p>Productos: ' + totalItems + '</p>' +
      '<p>Total: $' + total + '</p>' +
      '<a href="productos.html"><button>Seguir comprando</button></a>' +
      '<button id="vaciar">Vaciar carrito</button>' +
    '</div>';

  cont.innerHTML = html;

  document.getElementById("vaciar").onclick = function() {
    clearCart();
    mostrarPaginaCarrito();
  };
}

// inicializacion
document.addEventListener('DOMContentLoaded', function() {
    updateBadge();
    mostrarPaginaCarrito();
});