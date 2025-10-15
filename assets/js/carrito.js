

import { productos } from "./data.js";

const CART_KEY = "miTienda_cart_v1";

// menu hamburguesa
export function initHamburgerMenu() {
 const hamburger = document.querySelector(".hamburger");
 const navLinks = document.querySelector(".nav-links");

 if (hamburger && navLinks) {
 hamburger.addEventListener("click", () => {
 navLinks.classList.toggle("active");
 const expanded = hamburger.getAttribute("aria-expanded") === "true";
 hamburger.setAttribute("aria-expanded", !expanded);
 });

  window.addEventListener("resize", () => {
      const breakpoint = 768;
      if (window.innerWidth > breakpoint) {
        navLinks.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }
}


// funciones del carrito

export function getCart() {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateBadge();
}

export function addToCart(id) {
  const cart = getCart();
  let item = cart.find(i => i.id === id);
  if (item) {
    item.cantidad += 1;
  } else {
    cart.push({ id: id, cantidad: 1 });
  }
  saveCart(cart);
}

export function getQuantity(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  return item ? item.cantidad : 0;
}

function getCartCount() {
    const cart = getCart();
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        sum += cart[i].cantidad;
    }
    return sum;
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateBadge();
}

export function updateBadge() {
  const badge = document.getElementById("cart-count-badge");
  if (!badge) return;
  badge.textContent = getCartCount();
}

// renderizado pagina carrito

function mostrarPaginaCarrito() {
  const cont = document.getElementById("carritoContenido");
  if (!cont) return;

  const cart = getCart();
  if (cart.length === 0) {
    cont.innerHTML = "<img id='carrito' src='../assets/img/favicon.png' alt='Carrito vacío'><p id='p-carrito-vacio'>Tu carrito está vacío</p>";
    return;
  }

  let total = 0;
  let totalItems = 0;
  let html = "<table><thead><tr><th>Imagen</th><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead><tbody>";

  for (const item of cart) {
      const p = productos.find(prod => prod.id === item.id);
      if (!p) continue;

      const sub = p.precio * item.cantidad;
      total += sub;
      totalItems += item.cantidad;

      html += `<tr>
          <td><img src="../${p.img}" alt="${p.nombre}"></td>
          <td>${p.nombre}<br><small>ID: ${p.id}</small></td>
          <td>$${p.precio}</td>
          <td>${item.cantidad}</td>
          <td>$${sub}</td>
        </tr>`;
  }

  html += "</tbody></table>";
  html += `<div class="resumen">
      <h3>Resumen de compra</h3>
      <p>Productos: ${totalItems}</p>
      <p>Total: $${total}</p>
      <a href="productos.html"><button>Seguir comprando</button></a>
      <button id="vaciar">Vaciar carrito</button>
    </div>`;

  cont.innerHTML = html;
  document.getElementById("vaciar").onclick = function() {
    clearCart();
    mostrarPaginaCarrito();
  };
}

// inicializacion
document.addEventListener('DOMContentLoaded', function() {
    initHamburgerMenu(); // llamada a funcion de inicio del menu hamburguesa
    updateBadge();
    mostrarPaginaCarrito();
});