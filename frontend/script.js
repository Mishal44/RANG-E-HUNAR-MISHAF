// ------------------------------------------
// ADD PRODUCT TO CART
// ------------------------------------------

function addToCart(productName, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
        product => product.name === productName
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(productName + " added to your cart 🛒");

    updateCartCount();
}


// ------------------------------------------
// SHOW CART
// ------------------------------------------

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems) {
        return;
    }


    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h3>Your cart is empty 🛒</h3>

                <p>
                    Add some beautiful handmade products!
                </p>

                <a href="index.html"
                   class="shop-button">

                    Continue Shopping

                </a>

            </div>

        `;

        cartTotal.innerText = "0";

        return;
    }


    let total = 0;


    cart.forEach((product, index) => {

        const productTotal =
            product.price * product.quantity;


        total += productTotal;

     cartItems.innerHTML += `

    <div class="cart-item">

        <div class="cart-product-info">

            <h3>
                ${product.name}
            </h3>

            <p>
                Rs. ${product.price}
            </p>

        </div>


        <div class="quantity-control">

            <button
                onclick="decreaseQuantity(${index})">
                −
            </button>

            <span>
                ${product.quantity}
            </span>

            <button
                onclick="increaseQuantity(${index})">
                +
            </button>

        </div>


        <div class="product-total">

            Rs. ${productTotal}

        </div>


        <button
            class="remove-button"
            onclick="removeFromCart(${index})">

            Remove

        </button>

    </div>

`;

    });


    cartTotal.innerText =
        total.toLocaleString();

}

// ------------------------------------------
// INCREASE QUANTITY
// ------------------------------------------

function increaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cart[index].quantity++;


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();
}


// ------------------------------------------
// DECREASE QUANTITY
// ------------------------------------------

function decreaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();
}

// ------------------------------------------
// REMOVE PRODUCT
// ------------------------------------------

function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();
}

// ------------------------------------------
// CLEAR CART
// ------------------------------------------

function clearCart() {

    localStorage.removeItem("cart");


    displayCart();

    updateCartCount();

}

// ------------------------------------------
// CART COUNT
// ------------------------------------------

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");


    if (!cartCount) {
        return;
    }


    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    let count = 0;


    cart.forEach(product => {

        count += product.quantity;

    });


    cartCount.innerText = count;

}

// ------------------------------------------
// ORDER NOW
// ------------------------------------------

function orderNow(productName, price) {

    addToCart(productName, price);

    setTimeout(function () {

        checkoutWhatsApp();

    }, 300);

}

// ------------------------------------------
// WHATSAPP CHECKOUT
// ------------------------------------------

function checkoutWhatsApp() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    let message =
        "Hello RANG E HUNAR BY MISHAF! 🌸" +
        "\n\nI want to place an order:" +
        "\n\n";


    let total = 0;


    cart.forEach(product => {

        const productTotal =
            product.price * product.quantity;


        total += productTotal;


        message +=

            "Product: " +
            product.name +

            "\nQuantity: " +
            product.quantity +

            "\nPrice: Rs. " +
            productTotal +

            "\n\n";

    });


    message +=

        "Total: Rs. " +
        total +

        "\n\nPlease confirm my order. ❤️";


    // --------------------------------------
    // CHANGE THIS NUMBER
    // --------------------------------------

    const phoneNumber =
        "923278797947";


    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

}


// ------------------------------------------
// RUN WHEN PAGE LOADS
// ------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayCart();

        updateCartCount();

    }
);