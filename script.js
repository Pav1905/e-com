document.addEventListener('DOMContentLoaded', () => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

    function addToCart(name, price, image) {
        const product = { name, price, image };
        cartItems.push(product);

        cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartTotal', cartTotal);

        if (window.location.pathname.includes('cart.html')) {
            updateCart();
        }
    }

    function updateCart() {
        const cartSection = document.querySelector('.cart-items');
        const totalElement = document.querySelector('#totalAmount');

        cartSection.innerHTML = '';

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;

            cartSection.appendChild(cartItem);
        });

        totalElement.innerText = cartTotal;
    }

    function removeFromCart(index) {
        cartItems.splice(index, 1);
        cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartTotal', cartTotal);
        updateCart();
    }

    // Update cart on page load if on cart page
    if (window.location.pathname.includes('cart.html')) {
        updateCart();
    }

    // Expose addToCart and removeFromCart to the global scope
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
});


