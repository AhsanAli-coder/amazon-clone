import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { updateCartQuantity } from "../../data/cart.js";
export function paymentSummary() {
  let productTotalCents = 0;
  let productTaxCents=0;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    products.forEach((product) => {
      if (productId === product.id) {
        productTotalCents += product.priceCents * cartItem.quantity;
      }
    });
    deliveryOptions.forEach((deliveryOption)=>{
          if(deliveryOption.id==cartItem.deliveryOptionId)
          {
            productTaxCents+=deliveryOption.priceCents
          }
    })
  });
   const totalBeforeTaxCents=productTaxCents+productTotalCents;
   const taxCents=totalBeforeTaxCents*0.1;
   const totalCents=totalBeforeTaxCents+taxCents;
   const paymentSummaryHTML=`
           <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div class="js-payment-item">Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productTotalCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(productTaxCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
   `
    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
    document.querySelector('.js-payment-item').innerHTML=`items (${updateCartQuantity()})`
}
