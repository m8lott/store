document.addEventListener("DOMContentLoaded", function () {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setupCartQuantity(); 

   
            const menuToggle = document.getElementById('menu-toggle');
            const navLinks = document.getElementById('nav-links');
            const overlay = document.querySelector('.overlay');
            const links = navLinks.getElementsByTagName('a'); 
        
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                overlay.classList.toggle('active'); 
                menuToggle.classList.toggle('toggle');
            });
        
            function closeMenu() {
                navLinks.classList.remove('active');
                overlay.classList.remove('active'); 
                menuToggle.classList.remove('toggle');
            }
        
            overlay.addEventListener('click', closeMenu); 
        
            Array.from(links).forEach(link => {
                link.addEventListener('click', closeMenu);
            });
        });
});


function setupCartQuantity() {
    const cartQuantityElement = document.querySelector('.cart-quantity');
    if (cartQuantityElement) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        cartQuantityElement.textContent = totalQuantity;
    }
}
