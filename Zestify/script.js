```javascript
const API_URL = "http://localhost:8080/api/products";

let cartCount = 0;

const cartDisplay = document.getElementById("cartCount");
const productContainer = document.getElementById("productContainer");


// ================= LOAD PRODUCTS =================

async function loadProducts() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        const products = await response.json();

        displayProducts(products);

    } catch (error) {

        console.error(error);

        productContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger">
                    Unable to connect to the server.
                    <br>
                    Please start the Spring Boot backend.
                </div>
            </div>
        `;
    }
}


// ================= DISPLAY PRODUCTS =================

function displayProducts(products) {

    productContainer.innerHTML = "";

    if (products.length === 0) {

        productContainer.innerHTML = `
            <div class="col-12 text-center">
                <h4>No products available.</h4>
            </div>
        `;

        return;
    }


    products.forEach(function (product) {

        const productCard = document.createElement("div");

        productCard.className =
            "col-md-6 col-lg-4";


        productCard.innerHTML = `

            <div class="card product-card">

                <div class="product-image">

                    <img
                        src="${product.imageUrl}"
                        alt="${product.name}"
                        onerror="this.src='https://via.placeholder.com/500x400?text=Zestify+Product'">

                </div>

                <div class="card-body">

                    <h5 class="product-name">
                        ${product.name}
                    </h5>

                    <p class="product-description">
                        ${product.description || "Quality product from Zestify."}
                    </p>

                    <div class="mb-3">

                        <span class="price">
                            ₹${product.price}
                        </span>

                        ${
                            product.oldPrice
                            ?
                            `<span class="old-price">
                                ₹${product.oldPrice}
                            </span>`
                            :
                            ""
                        }

                    </div>

                    <button
                        class="btn btn-primary w-100 add-cart">

                        Add to Cart

                    </button>

                </div>

            </div>

        `;


        const button =
            productCard.querySelector(".add-cart");


        button.addEventListener("click", function () {

            cartCount++;

            cartDisplay.textContent = cartCount;

            button.textContent = "Added ✓";

            button.classList.remove("btn-primary");

            button.classList.add("btn-success");


            setTimeout(function () {

                button.textContent = "Add to Cart";

                button.classList.remove("btn-success");

                button.classList.add("btn-primary");

            }, 1000);

        });


        productContainer.appendChild(productCard);

    });
}


// ================= NEWSLETTER =================

const subscribeForm =
    document.getElementById("subscribeForm");

const emailInput =
    document.getElementById("email");

const emailError =
    document.getElementById("emailError");

const successMessage =
    document.getElementById("successMessage");


subscribeForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const email =
            emailInput.value.trim();

        emailError.textContent = "";

        successMessage.textContent = "";


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (email === "") {

            emailError.textContent =
                "Please enter your email address.";

            return;
        }


        if (!emailPattern.test(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            return;
        }


        successMessage.textContent =
            "Thank you for subscribing to Zestify! 🎉";

        subscribeForm.reset();

    }
);


// ================= START APPLICATION =================

loadProducts();
```

