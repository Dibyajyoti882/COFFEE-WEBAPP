// Get current cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add click listener to all "Order Now" buttons
document.querySelectorAll('.btn-sm').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
  });
});
