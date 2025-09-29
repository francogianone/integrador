import { productos } from "./data.js";
import { getCart, clearCart, updateBadge } from "./carrito.js";

window.onload = function() {
  updateBadge();
  const cont = document.getElementById("carritoContenido");

  function mostrar() {
    const cart = getCart();
    if (cart.length === 0) {
      cont.innerHTML = "<img id='carrito' src='../assets/img/favicon.png' alt='Carrito vacío'><p id='p-carrito-vacio'>Tu carrito está vacío</p>";
      return;
    }

    let total = 0;
    let totalItems = 0;
    let html = "<table><thead><tr><th>Imagen</th><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr></thead><tbody>";

    cart.forEach(item => {
      const p = productos.find(prod => prod.id === item.id);
      if (!p) return;
      const sub = p.precio * item.cantidad;
      total += sub;
      totalItems += item.cantidad;
      html += `
        <tr>
          <td><img src='../${p.img}' alt='${p.nombre}'></td>
          <td>${p.nombre}<br><small>ID: ${p.id}</small></td>
          <td>$${p.precio}</td>
          <td>${item.cantidad}</td>
          <td>$${sub}</td>
        </tr>
      `;
    });

    html += `</tbody></table>
      <div class="resumen">
        <h3>Resumen de compra</h3>
        <p>Productos: ${totalItems}</p>
        <p>Total: $${total}</p>
        <a href="productos.html"><button>Seguir comprando</button></a>
        <button id="vaciar">Vaciar carrito</button>
      </div>`;

    cont.innerHTML = html;
    document.getElementById("vaciar").onclick = function() {
      if (confirm("¿Seguro que querés vaciar el carrito?")) {
        clearCart();
        mostrar();
      }
    };
  }

  mostrar();
};
