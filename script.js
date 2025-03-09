document.addEventListener("DOMContentLoaded", () => {
    let cart = {}; 
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const orderSummary = document.querySelector(".order-summary"); 
    const totalItems = document.querySelector("#total-items"); 
    const totalPrice = document.querySelector("#total-price"); 
    const productQuantities = document.querySelector("#product-quantities"); 

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productCard = e.target.closest(".product-card"); 
            const productId = productCard.getAttribute("data-id"); 
            const productName = productCard.querySelector("h3").innerText;
            const productPrice = parseFloat(productCard.querySelector(".price").innerText.replace("$", "")); 

            if (cart[productId]) {
                cart[productId].quantity += 1; 
            } else {
                cart[productId] = { name: productName, quantity: 1, price: productPrice }; 
            }

            updateOrderSummary(); 
        });
    });

    function updateOrderSummary() {
        let totalItemsCount = 0;
        let totalPriceAmount = 0;
        let summaryHTML = ""; 
        let productSummaryHTML = ""; 

        for (const productId in cart) {
            const productInfo = cart[productId];
            totalItemsCount += productInfo.quantity;
            totalPriceAmount += productInfo.quantity * productInfo.price;

            productSummaryHTML += `
                <p>${productInfo.name}: ${productInfo.quantity} x $${productInfo.price.toFixed(2)}</p>
            `;
        }

        totalItems.innerText = totalItemsCount;
        totalPrice.innerText = totalPriceAmount.toFixed(2);

        productQuantities.innerHTML = productSummaryHTML;
    }
});
