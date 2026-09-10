```javascript
const API_URL = "http://localhost:8080/api/products";

const productForm =
    document.getElementById("productForm");

const productTable =
    document.getElementById("productTable");

const totalProducts =
    document.getElementById("totalProducts");

const message =
    document.getElementById("message");


// ================= LOAD PRODUCTS =================

async function loadProducts() {

    try {

        const response =
            await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch products");
        }

        const products =
            await response.json();

        displayProducts(products);

    } catch (error) {

        console.error(error);

        productTable.innerHTML = `
            <tr>
                <td colspan="6"
                    class="text-center text-danger">

                    Unable to connect to Spring Boot backend.

                </td>
            </tr>
        `;

    }
}


// ================= DISPLAY PRODUCTS =================

function displayProducts(products) {

    productTable.innerHTML = "";

    totalProducts.textContent =
        products.length;


    products.forEach(function (product) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${product.id}
            </td>

            <td>

                <div class="d-flex align-items-center gap-3">

                    <img
                        src="${product.imageUrl}"
                        alt="${product.name}"
                        onerror="this.src='https://via.placeholder.com/60'">

                    <strong>
                        ${product.name}
                    </strong>

                </div>

            </td>

            <td>
                ${product.category}
            </td>

            <td>
                ₹${product.price}
            </td>

            <td>
                ${
                    product.oldPrice
                    ? "₹" + product.oldPrice
                    : "-"
                }
            </td>

            <td>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteProduct(${product.id})">

                    Delete

                </button>

            </td>
        `;


        productTable.appendChild(row);

    });
}


// ================= ADD PRODUCT =================

productForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const product = {

            name:
                document.getElementById("name").value.trim(),

            price:
                parseFloat(
                    document.getElementById("price").value
                ),

            oldPrice:
                document.getElementById("oldPrice").value
                ?
                parseFloat(
                    document.getElementById("oldPrice").value
                )
                :
                null,

            category:
                document.getElementById("category").value,

            imageUrl:
                document.getElementById("imageUrl").value.trim(),

            description:
                document.getElementById("description").value.trim()

        };


        try {

            const response =
                await fetch(API_URL, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(product)

                });


            if (!response.ok) {
                throw new Error("Product could not be added");
            }


            message.innerHTML = `
                <div class="alert alert-success">
                    Product added successfully! 🎉
                </div>
            `;


            productForm.reset();

            loadProducts();


            setTimeout(function () {

                message.innerHTML = "";

            }, 3000);


        } catch (error) {

            console.error(error);

            message.innerHTML = `
                <div class="alert alert-danger">
                    Unable to add product.
                    Make sure the backend is running.
                </div>
            `;

        }

    }
);


// ================= DELETE PRODUCT =================

async function deleteProduct(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this product?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {
            throw new Error("Delete failed");
        }


        loadProducts();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete product."
        );

    }
}


// ================= START =================

loadProducts();
```
