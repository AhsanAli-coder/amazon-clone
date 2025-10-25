import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { updateCartQuantity } from "../../data/cart.js";
import { AddOrder } from "../../data/orders.js";
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

          <button class="place-order-button button-primary js-order-button">
            Place your order
          </button>
   `
    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
    document.querySelector('.js-payment-item').innerHTML=`items (${updateCartQuantity()})`
    document.querySelector('.js-order-button').addEventListener
    ('click',async()=>{
         const response=await fetch("https://supersimplebackend.dev/orders",{
            method:'POST',
            headers:{
              'Content-type':'application/json'
            },
            body: JSON.stringify({cart:cart})
            
         });
          const order=await response.json();
          AddOrder(order)
          console.log(order)

    })
}
