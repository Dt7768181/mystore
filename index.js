const products = [
    { id: 1, name: "P1", price: 25 },
    { id: 2, name: "P2", price: 45 },
    { id: 3, name: "P3", price: 30 },
];
const cart = {};
const addToCart = (id) => {
    if (!cart[id]) cart[id] = 1;
    showCart();
};
const increment = (id) => {
    cart[id] = cart[id] + 1;
    showCart();
};
const decrement = (id) => {
    cart[id] = cart[id] - 1;
    cart[id] < 1 && delete cart[id];
    console.log(cart);
    showCart();
};
const showTotal = () => {
    let total = products.reduce((sum, value) => {
        return sum + value.price * (cart[value.id] ? cart[value.id] : 0);
    }, 0);

    divTotal.innerHTML = `Order Value: $${total}`;
};

const showCart = () => {
    let str = "";
    products.map((value) => {
        if (cart[value.id]) {
            str += `
        <li>${value.name}-$${value.price}-<button onclick='decrement(${
                value.id
            })'>-</button>${cart[value.id]}<button onclick='increment(${
                value.id
            })'>+</button>-$${value.price * cart[value.id]}</li>
        `;
        }
    });
    divCart.innerHTML = str;
    let count = Object.keys(cart).length;
    items.innerHTML = count;
    showTotal();
};
const displayCart = () => {
    divCartBlock.style.left = "85%"

};
const hideCart = () => {
    divCartBlock.style.left = "100%"
};
const showProducts = () => {


    let str=`<div class='row'>`;
    products.map((value) => {
        str += `
        <div class='box'>
        <h3>${value.name}</h3>
        <h4>${value.price}</h4>
        <button onclick=addToCart(${value.id})>Add to Cart</button>
        </div>
      `;
    });
    str+="</div>";
    divProducts.innerHTML = str;
};