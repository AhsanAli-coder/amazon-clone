import { cart,addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";
products.forEach((product) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>
          <div class="product-quantity-container">
            <select class="js-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="product-spacer"></div>
          <div class="added-to-cart  js-add-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <button class="add-to-cart-button button-primary  js-add-to-cart   " data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>`;
});
document.querySelector(".js-products-grid").innerHTML = productsHTML;


function addToCartButton(productId) {
  let element = document.querySelector(`.js-add-to-cart-${productId}`);
  setTimeout(() => {
    element.classList.remove("add-to-cart-visible");
  }, 2000);
  element.classList.add("add-to-cart-visible");
}

// function updateCartQuantity(productId) {
//   let cartQuantity = 0;
//   cart.forEach((cartItem) => {
//     cartQuantity += cartItem.quantity;
//     document.querySelector(`.js-selector-${productId}`).value = "1";
//   });
//   document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
// }

function updateCartQuantity(productId) {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  // Always update the total quantity
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  // Only run this part if productId is provided
  if (productId !== undefined) {
    const inputElement = document.querySelector(`.js-selector-${productId}`);
    if (inputElement) {
      inputElement.value = "1";
    }
  }
}
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity(productId);
    addToCartButton(productId);
  });
}); 



