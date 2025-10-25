const orders= JSON.parse(localStorage.getItem('orders'))  ||[];

export function AddOrder(order)
{
    orders.push(order)
    saveToLocalStorageOrder();
    console.log(orders)

}
function saveToLocalStorageOrder()
{
      localStorage.setItem('orders',JSON.stringify(orders))
}

