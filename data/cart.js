export const cart=[];


 export function addToCart(productId) {
  let matched;
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {
      matched = cartItem;
    }
  });
  const value = Number(
    document.querySelector(`.js-selector-${productId}`).value
  );

  if (matched) {
    matched.quantity += value;
  } else {
    cart.push({
      productId: productId,
      quantity: value || 1,
    });
  }
}