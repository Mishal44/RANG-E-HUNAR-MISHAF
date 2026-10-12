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



/* Customer Reviews System - Supabase */

const SUPABASE_URL = "https://fttcocmwmsikjjdxdkyo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_gBBsbfqudQn6K1EbTAxOSg_SqZzEpwn";

const REVIEWS_TABLE_URL = `${SUPABASE_URL}/rest/v1/reviews`;
const STORAGE_BUCKET = "order-review-photos";

document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById("reviewForm");
    const starButtons = document.querySelectorAll("#starRating button");
    const reviewMessage = document.getElementById("reviewMessage");
    const reviewsContainer = document.getElementById("approvedReviews");
    const photoInput = document.getElementById("orderPhoto");

    if (!reviewForm || !reviewsContainer) return;

    let selectedRating = 0;

    // Supabase request headers
    function supabaseHeaders(extraHeaders = {}) {
        return {
            apikey: SUPABASE_PUBLISHABLE_KEY,
            ...extraHeaders
        };
    }

    // Customer rating select karna
    function updateStars() {
        starButtons.forEach((button) => {
            const rating = Number(button.dataset.rating);
            button.style.color =
                rating <= selectedRating ? "#f4b400" : "#bdbdbd";
            button.setAttribute(
                "aria-pressed",
                String(rating === selectedRating)
            );
        });
    }

    starButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedRating = Number(button.dataset.rating);
            updateStars();
        });
    });

    // Website par reviews show karna
    function displayReviews(reviews) {
        reviewsContainer.replaceChildren();

        if (!reviews.length) {
            const message = document.createElement("p");
            message.textContent = "Be the first to share your experience! 💖";
            reviewsContainer.appendChild(message);
            return;
        }

        reviews.forEach((review) => {
            const card = document.createElement("article");
            card.className = "review-card";

            const name = document.createElement("h3");
            name.textContent = review.customer_name;
            card.appendChild(name);

            const stars = document.createElement("p");
            stars.textContent = "★".repeat(review.rating) +
                "☆".repeat(5 - review.rating);
            stars.style.color = "#f4b400";
            stars.setAttribute("aria-label", `${review.rating} out of 5 stars`);
            card.appendChild(stars);

            const text = document.createElement("p");
            text.textContent = review.review_text;
            card.appendChild(text);

            if (review.image_url) {
                const image = document.createElement("img");
                image.src = review.image_url;
                image.alt = `Order shared by ${review.customer_name}`;
                image.loading = "lazy";
                image.style.maxWidth = "100%";
                image.style.height = "auto";
                image.style.borderRadius = "10px";
                card.appendChild(image);
            }

            if (review.created_at) {
                const date = document.createElement("small");
                date.textContent = new Date(review.created_at)
                    .toLocaleDateString();
                card.appendChild(date);
            }

            // WhatsApp sharing
            const whatsappButton = document.createElement("button");
            whatsappButton.type = "button";
            whatsappButton.textContent = "Share on WhatsApp";
            whatsappButton.addEventListener("click", () => {
                const message =
                    `Customer Review - RANG E HUNAR BY MISHAF\n\n` +
                    `${review.customer_name}\n` +
                    `${"★".repeat(review.rating)}\n` +
                    `${review.review_text}\n\n` +
                    window.location.href;

                window.open(
                    "https://wa.me/?text=" + encodeURIComponent(message),
                    "_blank",
                    "noopener,noreferrer"
                );
            });
            card.appendChild(whatsappButton);

            // Instagram sharing: copy review text
            const instagramButton = document.createElement("button");
            instagramButton.type = "button";
            instagramButton.textContent = "Copy for Instagram";
            instagramButton.addEventListener("click", async () => {
                const message =
                    `${review.customer_name} ⭐ ${review.rating}/5\n` +
                    `${review.review_text}\n\n` +
                    "RANG E HUNAR BY MISHAF 💖";

                try {
                    await navigator.clipboard.writeText(message);
                    alert(
                        "Review text copied! Ab Instagram open karke paste kar do. 💖"
                    );
                } catch {
                    alert("Review text copy nahi hua. Please text manually copy karo.");
                }
            });
            card.appendChild(instagramButton);

            reviewsContainer.appendChild(card);
        });
    }

    // Supabase se latest reviews load karna
    async function loadReviews() {
        try {
            const response = await fetch(
                `${REVIEWS_TABLE_URL}?select=id,customer_name,rating,review_text,image_url,created_at&order=created_at.desc`,
                {
                    headers: supabaseHeaders()
                }
            );

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const reviews = await response.json();
            displayReviews(reviews);
        } catch (error) {
            console.error("Reviews load error:", error);
            reviewsContainer.textContent =
                "Reviews abhi load nahi ho rahe. Please thori dair baad try karein.";
        }
    }

    // Photo ko Supabase Storage par upload karna
    async function uploadOrderPhoto(file) {
        if (!file) return null;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            throw new Error("Please JPG, PNG ya WebP photo upload karein.");
        }

        if (file.size > 2 * 1024 * 1024) {
            throw new Error("Photo ka size 2 MB se kam hona chahiye.");
        }

        const extensionByType = {
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/webp": "webp"
        };

        const randomId = window.crypto?.randomUUID
            ? window.crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        const filePath =
            `${Date.now()}-${randomId}.${extensionByType[file.type]}`;

        const uploadUrl =
            `${SUPABASE_URL}/storage/v1/object/` +
            `${STORAGE_BUCKET}/${encodeURIComponent(filePath)}`;

        const response = await fetch(uploadUrl, {
            method: "POST",
            headers: supabaseHeaders({
                "Content-Type": file.type,
                "x-upsert": "false"
            }),
            body: file
        });

        if (!response.ok) {
            throw new Error(
                "Photo upload nahi hui. Supabase Storage bucket aur policies check karein."
            );
        }

        return (
            `${SUPABASE_URL}/storage/v1/object/public/` +
            `${STORAGE_BUCKET}/${encodeURIComponent(filePath)}`
        );
    }

    // Review submit karna
    reviewForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const customerName =
            document.getElementById("customerName").value.trim();

        const reviewText =
            document.getElementById("customerReview").value.trim();

        const submitButton =
            reviewForm.querySelector('button[type="submit"]');

        if (!customerName || !reviewText || selectedRating === 0) {
            reviewMessage.textContent =
                "Please name, review aur star rating complete karein.";
            return;
        }

        if (customerName.length > 100 || reviewText.length > 2000) {
            reviewMessage.textContent =
                "Name 100 aur review 2000 characters se zyada nahi hona chahiye.";
            return;
        }

        if (
            SUPABASE_PUBLISHABLE_KEY ===
            "PASTE_YOUR_SB_PUBLISHABLE_KEY_HERE"
        ) {
            reviewMessage.textContent =
                "Pehle apni Supabase Publishable Key code mein add karein.";
            return;
        }

        const photo = photoInput?.files?.[0];

        submitButton.disabled = true;
        reviewMessage.textContent = "Your review is being submitted... 💌";

        try {
            // Pehle photo upload hogi, agar customer ne photo select ki hai
            const imageUrl = await uploadOrderPhoto(photo);

            const response = await fetch(REVIEWS_TABLE_URL, {
                method: "POST",
                headers: supabaseHeaders({
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal"
                }),
                body: JSON.stringify({
                    customer_name: customerName,
                    rating: selectedRating,
                    review_text: reviewText,
                    image_url: imageUrl
                })
            });

            if (!response.ok) {
                throw new Error(
                    "Review save nahi hua. Supabase table aur permissions check karein."
                );
            }

            reviewForm.reset();
            selectedRating = 0;
            updateStars();

            reviewMessage.textContent =
                "Thank you! Your review has been published. 💖";

            await loadReviews();
        } catch (error) {
            console.error("Review submit error:", error);
            reviewMessage.textContent =
                error.message || "Review submit nahi hua. Please try again.";
        } finally {
            submitButton.disabled = false;
        }
    });

    // Page open hone par reviews load honge
    loadReviews();
});
