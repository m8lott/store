const CART_KEY = 'cart';

const products = [
    { id: 1, name: "Elegant Evening", price: 120.00, description: "A sleek black clutch with gold accents, perfect for formal events." },
    { id: 2, name: "Casual Chic", price: 85.00, description: "A stylish crossbody bag in pastel colors for everyday wear." },
    { id: 3, name: "Vintage Allure", price: 150.00, description: "A leather handbag with a vintage feel, featuring intricate stitching." },
    { id: 4, name: "Urban Explorer", price: 95.00, description: "A versatile backpack with multiple compartments, ideal for city adventures." },
    { id: 5, name: "Luxury Traveler", price: 250.00, description: "An oversized tote with premium leather and spacious interior for travel." },
    { id: 6, name: "Summer Breeze", price: 70.00, description: "A woven straw bag with floral accents, perfect for beach days." },
    { id: 7, name: "Night Out", price: 60.00, description: "A small, sparkling clutch designed for evening outings and parties." },
    { id: 8, name: "Office Essential", price: 110.00, description: "A professional-looking handbag with room for essentials and a laptop." }
];


function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = products.find(item => item.id === productId);

    if (product) {
        const existingItem = cart.find(cartItem => cartItem.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        saveCart(cart);
        updateCartQuantity();
    }
}

function removeFromCart(productId) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {

        cart[itemIndex].quantity -= 1;


        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }


        saveCart(cart);
        updateCartQuantity();
        renderCartItems();
    }
}


function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartQuantity();
    renderCartItems();
}

function updateCartQuantity() {
    const cart = getCart();
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const cartQuantityElement = document.querySelector('.cart-quantity');
    if (cartQuantityElement) {
        cartQuantityElement.textContent = totalQuantity;
    }
}


function renderShopItems() {
    const productsContainer = document.querySelector('.products__items');
    if (productsContainer) {
        productsContainer.innerHTML = ''; 

        products.forEach(product => {
            const productHTML = `
            <div class="products__item">
                <div class="products__item-img">
                    <img src="assets/img/product${product.id}.jpeg" alt="${product.name}">
                </div>
                <div class="products__item-price">
                    <p>$${product.price}</p>
                </div>
                <div class="products__item-title">
                    <h3>${product.name}</h3>
                </div>
                <div class="products__item-desc">
                    <p>${product.description}</p>
                </div>
                <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
            `;
            productsContainer.innerHTML += productHTML;
        });

        productsContainer.addEventListener('click', function(event) {
            if (event.target && event.target.matches('.add-to-cart-btn')) {
                const productId = parseInt(event.target.getAttribute('data-product-id'), 10);
                addToCart(productId);
            }
        });
    }
}

// Cart Page: Render cart items
function renderCartItems() {
    const cart = getCart();
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPriceElement = document.querySelector('.cart-total-price');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="alert">Your cart is empty.</p>';
        if (cartTotalPriceElement) cartTotalPriceElement.textContent = 'Total Price: $0.00';
    } else {
        let totalPrice = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const cartItemHTML = `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Price: $${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Total: $${itemTotal.toFixed(2)}</p>
                    </div>
                    <button class="remove-from-cart-btn" data-product-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
        });
        if (cartTotalPriceElement) cartTotalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }
}



document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    if (path.includes("shop")) {
        renderShopItems();
        updateCartQuantity();
    } else if (path.includes("cart")) {
        renderCartItems();
        updateCartQuantity();
        document.querySelector('.clear-cart-btn').addEventListener('click', clearCart);


        document.querySelector('.cart-items').addEventListener('click', function(event) {
            if (event.target && event.target.matches('.remove-from-cart-btn')) {
                const productId = parseInt(event.target.getAttribute('data-product-id'), 10);
                removeFromCart(productId);
            }
        });
    }
});
