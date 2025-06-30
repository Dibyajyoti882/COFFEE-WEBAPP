let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Add to cart from buttons
document.querySelectorAll('.btn-sm').forEach(button => {
    button.addEventListener('click', function () {
        const itemName = this.getAttribute('data-name');
        const itemPrice = `₹${this.getAttribute('data-price')}`;
        addToCart(itemName, itemPrice);
    Swal.fire({
    icon: 'success',
    title: 'Added to Cart!',
    text: `${itemName} has been added.`,
    timer: 1500,
    showConfirmButton: false
});

    });
});

function addToCart(name, price) {
    const existingIndex = cart.findIndex(item => item.name === name);
    if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Render cart on cart.html
if (window.location.href.includes("{% url 'cart' %}")) {
    showCart();
}

function showCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartSummary = document.getElementById('cart-summary');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartSummary.innerHTML = "";
        return;
    }

    let html = "<table><tr><th>Item</th><th>Price</th><th>Qty</th><th>Total</th><th>Actions</th></tr>";
    let total = 0;

    cart.forEach((item, index) => {
        const priceNum = parseInt(item.price.replace("₹", ""));
        const itemTotal = priceNum * item.quantity;
        total += itemTotal;

        html += `
        <tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <button onclick="changeQuantity(${index}, -1)">−</button>
                ${item.quantity}
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td>₹${itemTotal}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        </tr>`;
    });

    html += "</table>";
    cartContainer.innerHTML = html;

    cartSummary.innerHTML = `
        <h3>Total: ₹${total}</h3>
        <input type="text" id="coupon" placeholder="Enter coupon code" />
        <button onclick="applyCoupon(${total})">Apply</button>
        <div id="discount-area"></div>
        <button onclick="checkout()">Checkout</button>
    `;
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
    updateCartCount();
}

function applyCoupon(total) {
    const code = document.getElementById('coupon').value.trim().toUpperCase();
    let discount = 0;

    if (code === "COFFEE10") {
        discount = total * 0.10;
    } else if (code === "BREW50") {
        discount = total * 0.50;
    } else {
        alert("Invalid coupon code");
        return;
    }

    const final = total - discount;
    document.getElementById('discount-area').innerHTML = `
        <p>Coupon Applied! Discount: ₹${discount.toFixed(2)}</p>
        <h3>Final Total: ₹${final.toFixed(2)}</h3>
    `;
}

function checkout() {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops!',
            text: 'Your cart is empty!',
        });
        return;
    }

    // Calculate total
    const total = cart.reduce((sum, item) => {
        const priceNum = parseInt(item.price.replace("₹", ""));
        return sum + priceNum * item.quantity;
    }, 0);

    Swal.fire({
        title: 'Confirm Order',
        text: `Your total is ₹${total}. Do you want to proceed?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Buy Now!',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#4CAF50'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Thank you!',
                text: `Your order has been placed.\nTotal: ₹${total}`,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#4CAF50'
            });

            cart = [];
            localStorage.removeItem('cart');
            showCart();
            updateCartCount();
        }
    });
}
