import { cart ,removeFromCart,updateCartQuantity} from "../data/cart.js";
import {products} from "../data/products.js"
import { formatCurrency } from "./utils/money.js";
let checkoutHtml='';
cart.forEach((cartItem)=>{
              let matched;
              products.forEach((product)=>
              {
                     if(product.id==cartItem.productId)
                     {
                      matched=product
                     }
              })
              checkoutHtml+=`<div class="cart-item-container  js-cart-item-container-${matched.id}">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matched.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                    ${matched.name}
                </div>
                <div class="product-price">${formatCurrency(matched.priceCents)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link"  data-product-id="${matched.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="${matched.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="${matched.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="${matched.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
})
document.querySelector('.order-summary').innerHTML=checkoutHtml;
document.querySelectorAll('.js-delete-link').forEach((button)=>
{
        button.addEventListener('click',()=>
        {

             const productId=button.dataset.productId
             removeFromCart(productId);
            const container= document.querySelector(`.js-cart-item-container-${productId}`)  
            console.log(container)   ;
            container.remove()
             const newQuantity = updateCartQuantity();
    document.querySelector('.js-return-to-home-link').innerHTML = `${newQuantity} items`;
        }
        )
}
)
let q=updateCartQuantity()
document.querySelector('.js-return-to-home-link')
  .innerHTML = `${q} items`;

console.log(q)