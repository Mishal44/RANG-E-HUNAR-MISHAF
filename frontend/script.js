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


/* Customer Reviews System */

document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.getElementById("reviewForm");

    // Run only on pages containing the review form
    if (!reviewForm) return;

    const starButtons = document.querySelectorAll(
        "#starRating button"
    );
    const reviewMessage = document.getElementById("reviewMessage");
    const approvedReviews = document.getElementById("approvedReviews");

    let selectedRating = 0;

    
let savedReviews = JSON.parse(
    localStorage.getItem("rangE hunarReviews") || "[]"
);

function saveReviews() {
    localStorage.setItem(
        "rangE hunarReviews",
        JSON.stringify(savedReviews)
    );
}


function displaySavedReviews() {
    approvedReviews.innerHTML = "";

    savedReviews.forEach(function (review) {
        const card = document.createElement("div");
        card.style.cssText =
            "background:#fff;padding:18px;margin:15px 0;" +
            "border:1px solid #f3d5e3;border-radius:12px;text-align:left;";

        const name = document.createElement("h3");
        name.textContent = review.name;
        name.style.color = "#a83265";

        const stars = document.createElement("p");
        stars.textContent =
            "⭐".repeat(review.rating) +
            " (" + review.rating + "/5)";
        stars.style.color = "#f4b400";

        const text = document.createElement("p");
        text.textContent = review.text;

        const message =
            "Review for RANG E HUNAR BY MISHAF 💖\n\n" +
            "Customer: " + review.name + "\n" +
            "Rating: " + "⭐".repeat(review.rating) +
            " (" + review.rating + "/5)\n" +
            "Review: " + review.text;

        const whatsappButton = document.createElement("button");
        whatsappButton.type = "button";
        whatsappButton.textContent = "Send Review on WhatsApp";
        whatsappButton.className = "review-submit";

        whatsappButton.addEventListener("click", function () {
            const url =
                "https://wa.me/923278797947?text=" +
                encodeURIComponent(message);

            window.open(url, "_blank", "noopener,noreferrer");
        });

        const instagramButton = document.createElement("button");
        instagramButton.type = "button";
        instagramButton.textContent = "Send Review on Instagram 💗";
        instagramButton.className = "review-submit";
        instagramButton.style.background = "#C13584";
        instagramButton.style.marginTop = "10px";

        instagramButton.addEventListener("click", async function () {
            try {
                await navigator.clipboard.writeText(message);
                alert("Review copied! Paste it into Instagram DM.");
            } catch (error) {
                alert("Please copy your review text and share it on Instagram.");
            }

            window.open(
                "https://www.instagram.com/rang_e_hunar.by_mishaf/",
                "_blank",
                "noopener,noreferrer"
            );
        });

        card.append(
            name,
            stars,
            text,
            whatsappButton,
            instagramButton
        );

        approvedReviews.appendChild(card);
    });
}


displaySavedReviews();


    // Star rating selection
    starButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedRating = Number(button.dataset.rating);

            starButtons.forEach(function (star) {
                const isSelected =
                    Number(star.dataset.rating) <= selectedRating;

                star.classList.toggle("active", isSelected);
                star.setAttribute(
                    "aria-pressed",
                    String(Number(star.dataset.rating) === selectedRating)
                );
            });

            reviewMessage.textContent =
                "You selected " + selectedRating + " out of 5 stars.";
        });
    });

    // Review form submission
    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const customerName =
            document.getElementById("customerName").value.trim();

        const customerReview =
            document.getElementById("customerReview").value.trim();

        if (!customerName || !customerReview) {
            reviewMessage.textContent =
                "Please enter your name and review.";
            return;
        }

        if (selectedRating === 0) {
            reviewMessage.textContent =
                "Please select a star rating first.";
            return;
        }

        // Prepare a WhatsApp message
        const message =
            "Customer Review - RANG E HUNAR BY MISHAF\n\n" +
            "Name: " + customerName + "\n" +
            "Rating: " + "★".repeat(selectedRating) + "\n" +
            "Review: " + customerReview;

const yourWhatsAppNumber = "923278797947";

const whatsappURL =
    "https://wa.me/" + yourWhatsAppNumber +
    "?text=" + encodeURIComponent(message);


        // Create a preview safely using textContent
        const reviewCard = document.createElement("div");
        reviewCard.style.cssText =
            "background:#fff;padding:18px;margin:15px 0;" +
            "border:1px solid #f3d5e3;border-radius:12px;text-align:left;";

        const nameHeading = document.createElement("h3");
        nameHeading.textContent = customerName;
        nameHeading.style.color = "#a83265";

        const ratingText = document.createElement("p");
        ratingText.textContent =
            "★".repeat(selectedRating) +
            "☆".repeat(5 - selectedRating);
        ratingText.style.color = "#f4b400";

        const reviewText = document.createElement("p");
        reviewText.textContent = customerReview;

        const pendingText = document.createElement("p");
        pendingText.textContent =
            "Your review preview (not published).";
        pendingText.style.color = "#777";

        const shareButton = document.createElement("button");
        shareButton.type = "button";
        shareButton.textContent = "Send Review on WhatsApp";
        shareButton.className = "review-submit";
        shareButton.addEventListener("click", function () {
            window.open(whatsappURL, "_blank", "noopener,noreferrer");
        });

        reviewCard.append(
            nameHeading,
            ratingText,
            reviewText,
            pendingText,
            shareButton
        );

        

const instagramButton = document.createElement("button");
instagramButton.type = "button";
instagramButton.textContent = "Send Review on Instagram 💗";
instagramButton.className = "review-submit";
instagramButton.style.marginTop = "10px";
instagramButton.style.background = "#C13584";

instagramButton.addEventListener("click", async function () {

const ratingToSend = selectedRating;

const instagramMessage =
    "Review for RANG E HUNAR BY MISHAF 💖\n\n" +
    "Customer: " + customerName + "\n" +
    "Rating: " + "⭐".repeat(ratingToSend) +
    " (" + ratingToSend + "/5)\n" +
    "Review: " + customerReview;


    try {
        await navigator.clipboard.writeText(instagramMessage);
        alert(
            "Your review has been copied! Paste it into Instagram DM."
        );
    } catch (error) {
        alert("Please copy your review text and paste it into Instagram.");
    }

    window.open(
        "https://www.instagram.com/rang_e_hunar.by_mishaf/",
        "_blank",
        "noopener,noreferrer"
    );
});

reviewCard.appendChild(instagramButton);



    savedReviews.unshift({
    name: customerName,
    rating: selectedRating,
    text: customerReview
});

saveReviews();
displaySavedReviews();

        reviewMessage.textContent =
            "Review preview ready! Send it on WhatsApp if you wish.";

        reviewForm.reset();
        selectedRating = 0;

        starButtons.forEach(function (star) {
            star.classList.remove("active");
            star.setAttribute("aria-pressed", "false");
        });
    });
});
