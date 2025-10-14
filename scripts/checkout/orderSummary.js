import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { paymentSummary } from "./paymentSummary.js";

 export function renderOrderSummary() {
  let checkoutHtml = "";

  cart.forEach((cartItem) => {
    let matched;
    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        matched = product;
      }
    });
    let deliveryString;
    deliveryOptions.forEach((deliveryOption) => {
      if (cartItem.deliveryOptionId === deliveryOption.id) {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
        deliveryString = deliveryDate.format("dddd,MMMM D");
        const priceString =
          deliveryOption.priceCents === 0
            ? "Free"
            : `
          ${formatCurrency(deliveryOption.priceCents)}`;
      }
    });
    checkoutHtml += `
    <div class="cart-item-container js-cart-item-container-${matched.id}">
      <div class="delivery-date">Delivery date:${deliveryString}</div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matched.image}" />

        <div class="cart-item-details">
          <div class="product-name">${matched.name}</div>
          <div class="product-price">${formatCurrency(matched.priceCents)}</div>

          <div class="product-quantity">
            <span>Quantity: 
              <span class="quantity-label js-quantity-label-${matched.id}">
                ${cartItem.quantity}
              </span>
            </span>

            <input 
              class="quantity-input js-quantity-input-${matched.id}" 
              type="number" 
              min="1" 
              value="${cartItem.quantity}" 
              style="width:50px; display:none;"
            >

            <span 
              class="update-quantity-link link-primary js-update-link" 
              data-product-id="${matched.id}">
              Update
            </span>

            <span 
              class="save-quantity-link link-primary js-save-link" 
              data-product-id="${matched.id}" 
              style="display:none;">
              Save
            </span>

            <span 
              class="delete-quantity-link link-primary js-delete-link" 
              data-product-id="${matched.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:
           </div>   
            ${deliveryOptionHtml(matched, cartItem)}
      </div>
    </div>
    </div>`;
  });
  function deliveryOptionHtml(matched, cartItem) {
    let optionHtml = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const deliveryString = deliveryDate.format("dddd,MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "Free"
          : `
          ${formatCurrency(deliveryOption.priceCents)}`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      optionHtml += `
           <div class="delivery-option js-delivery-option "  data-product-id="${
             matched.id
           }"
             data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" class="delivery-option-input" name="delivery-option-${
              matched.id
            }"
              ${isChecked ? "checked" : ""} />
            <div>
              <div class="delivery-option-date">${deliveryString}</div>
              <div class="delivery-option-price">${priceString} - Shipping</div>
            </div>
          </div>
         `;
    });
    return optionHtml;
  }

  document.querySelector(".order-summary").innerHTML = checkoutHtml;
  document.querySelectorAll(".js-delete-link").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
        paymentSummary()
      if (container) container.remove();

      const newQuantity = updateCartQuantity();
      document.querySelector(
        ".js-return-to-home-link"
      ).innerHTML = `${newQuantity} items`;
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const saveLink = document.querySelector(
        `.js-save-link[data-product-id="${productId}"]`
      );
      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );

      quantityLabel.style.display = "none";
      quantityInput.style.display = "inline-block";
      saveLink.style.display = "inline-block";

      quantityInput.focus();
      quantityInput.select();
    });
  });

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      const newQuantity = Number(quantityInput.value);

      if (newQuantity <= 0) {
        alert("Quantity must be at least 1.");
        return;
      }

      const cartItem = cart.find((item) => item.productId === productId);
      if (cartItem) {
        cartItem.quantity = newQuantity;
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      quantityLabel.innerHTML = newQuantity;
      quantityLabel.style.display = "inline";
      quantityInput.style.display = "none";
      link.style.display = "none";

      const totalQuantity = updateCartQuantity();
      document.querySelector(
        ".js-return-to-home-link"
      ).innerHTML = `${totalQuantity} items`;
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    const productId = element.dataset.productId;
    const deliveryOptionId = element.dataset.deliveryOptionId;
    element.addEventListener("click", () => {
      console.log("Clicked:", productId, deliveryOptionId); // 🔍 debug line

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary()
      paymentSummary()
    });
  });
  let q = updateCartQuantity();
  document.querySelector(".js-return-to-home-link").innerHTML = `${q} items`;
}
