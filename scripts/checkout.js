import { renderOrderSummary } from "./checkout/orderSummary.js";
import { paymentSummary } from "./checkout/paymentSummary.js";
import "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";

await loadProducts();
renderOrderSummary();
paymentSummary();

