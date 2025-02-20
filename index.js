// const products = [
//     { id: 1, name: "P1", price: 25, desc:"Description of product 1" },
//     { id: 2, name: "P2", price: 45, desc:"Description of product 2" },
//     { id: 3, name: "P3", price: 30, desc:"Description of product 3" },
// ];
let orders=[];
let users = [];
let user = { name:"admin", email:"admin@gmail.com", password:"1" };
users.push(user);
let products=[];
let cart = {};
let total=0;
let count=0;
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
    total = products.reduce((sum, value) => {
        return sum + value.price * (cart[value.id] ? cart[value.id] : 0);
    }, 0);

    divTotal.innerHTML = `Order Value: $${total}`;
};

const showCart = () => {
    let str = "";
    products.map((value) => {
        if (cart[value.id]) {
            str += `
        <p>${value.name}-$${value.price}-<button onclick='decrement(${
                value.id
            })'>-</button>${cart[value.id]}<button onclick='increment(${
                value.id
            })'>+</button>-$${value.price * cart[value.id]}</p>     
        `;
        }
    });
    divCart.innerHTML = str;
    count = Object.keys(cart).length;
    items.innerHTML = count;
    showTotal();
};
const displayCart = () => {
    divCartBlock.style.left = "85%"

};
const hideCart = () => {
    divCartBlock.style.left = "100%"
};
function addUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let user = {
        name: name,
        email: email,
        password: password,
        dob: dob,
    };
    users.push(user);
    showLogin();
    // showUsers();
}
function chkUser() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            // useremail = email;
            // username = users[i].name;
            // currBalance = users[i].balance;
            user = users[i];
            showMain();
            break;
        } else {
            msg.innerHTML = "Access Denied";
        }
    }
}
const showMain = () =>{
    let str=`<div class="container">
    <div class="header">
        <h1>My Store</h1>
        <div class="navi">
        <img src="assets/images/box-open-full.png" width="30px" height="30px" onclick="showProducts()" id="icons">
        <img src="assets/images/list.png" width="30px" height="30px" onclick="showOrders()" id="icons">
        <img src="assets/images/cart-arrow-down.png" onclick="displayCart()" id="icons" width="30px" height="30px">:<span id="items"></span>
        <img src="assets/images/sign-out-alt.png" onclick="showLogin()" id="icons" width="30px" height="30px">
        </div>
    </div>

    <div class="productBlock">
        <h3 id="prohead">Products</h3>
        <div id="divProducts"></div>
    </div>

    <div id="divCartBlock" class="cartBlock">
        <h3>My Cart</h3>
        <div id="divCart"></div>
        <div id="divTotal"></div>
        <button onclick="hideCart()">Close</button>
        <button onclick="placeOrder()">Place Order</button><br>
    </div>
</div>`
    root.innerHTML=str;
    showProducts();
}
function showForm() {
    let str = `
    <div class="registration">
  <h2>Registration Form</h2>
  <p><input type="text" id="name" placeholder="Name"></p>
  <p><input type="text" id="email" placeholder="Email"></p>
  <p><input type="password" id="password" placeholder="Password"></p>
  <p><input type="date" id="dob"></p>
  <p><button onclick='addUser()'>Submit</button></p>
  <p>Already a member?<button onclick='showLogin()'>Login Here</button></p>
  </div>
  `;
    root.innerHTML = str;
}
function showLogin() {
    let str = `
    <div class="logcontainer">
    <div class="login">
      <h2>Login Form</h2>
      <div id='msg'></div>
      <p><input id="email" type="text"></p>
      <p><input id="password" type="password"></p>
      <p><button onclick='chkUser()'>Log In</button></p><br>
      <p><button onclick='showForm()'>Create Account</button></p>
    </div>
    </div>
  `;
    root.innerHTML = str;
}
const showProducts = () => {
    fetch("products.json")
        .then((res)=>res.json())
        .then((data)=>(products=data))
        .then(()=>{
        let str="<div class='row'>";
        products.map((value) => {
            str += `
            <div class='box'>
            <h3>${value.name}</h3>
            <h4>${value.price}</h4>
            <p>${value.desc}</p>
            <button onclick=addToCart(${value.id}) class="btncart"><img src="assets/images/shopping-cart-add.png" width="13px" height="13px" style="padding-right:10px;">Add to Cart</button>
            </div>
          `;
        });
        str+="</div>";
        divProducts.innerHTML = str;
    });
};
const placeOrder=()=>{
    const obj={
        customer:user.email,
        items:cart,
        orderValue:total,
        status:"pending"
    }
    orders.push(obj);
    showOrders();
}
const showOrders = () => {
    let str = "";
    orders.map((value) => {
        if (value.customer === user.email) {
            str = `<p>Name:${value.customer}<br> Total Value:${value.orderValue}<br> No of Items:${count}<br> Status:${value.status}</p>`;
        }
    });
    divProducts.innerHTML = str;
};
