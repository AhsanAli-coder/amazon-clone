
export let cart = JSON.parse(localStorage.getItem('cart'))

if(!cart)
{
  cart=[
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId:'1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
    deliveryOptionId:'3'

  }

];
}

export function updateCartQuantity()
{
  let cartQuantity = 0;

cart.forEach((cartItem) => {
  cartQuantity += 1;
});
      return cartQuantity;

}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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
      deliveryOptionId:'1'
    });
  }
    saveToStorage();
    updateCartQuantity();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage()
  updateCartQuantity()
}


export function updateDeliveryOption(productId,deliveryOptionId)
{
    let matched;
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {
      matched = cartItem;
    }
  })
  matched.deliveryOptionId=deliveryOptionId;
  saveToStorage();      
}