const menuData = {
    1: [
        { name: "Margherita Pizza", price: 10, img: "Margherita.jpg" },
        { name: "Paneer Pizza", price: 12, img: "panner.jpg" },
        { name: "Veggie Pizza", price: 11, img: "veggie.jpg" },
    ],
    2: [
        { name: "Cheese Burger", price: 8, img: "cheese.jpg" },
        { name: "Butter Burger", price: 9, img: "butter.jpg" },
        { name: "Mushroom Burger", price: 7, img: "mushroom.jpg" },
    ],
    3: [
        { name: "Flat White", price: 15, img: "flat.jpg" },
        { name: "Classic Cappuccino", price: 10, img: "classic.jpg" },
        { name: "Toffee Latte", price: 16, img: "toffee.jpg" },
    ],
    4: [
        { name: "Popcorn Chicken", price: 12, img: "popcorn.jpg" },
        { name: "Chicken Zinger", price: 15, img: "chicken.jpg" },
        { name: "Mingles Chicken", price: 30, img: "mingles.jpg" },
    ],
};


const restaurants = document.querySelectorAll('.restaurant');
const menuSection = document.getElementById('menu');
const menuItems = document.getElementById('menu-items');
const orderSummary = document.getElementById('order-summary');
const orderList = document.getElementById('order-list');
const restaurantSearch = document.getElementById('restaurant-search');
const foodSearch = document.getElementById('food-search');
const deliveryStatement = document.getElementById('delivery-statement');
const reviewsList = document.getElementById('reviews-list');
let currentRestaurantId = null;
let order = [];

restaurants.forEach(restaurant => {
    restaurant.querySelector('.view-menu').addEventListener('click', () => {
        currentRestaurantId = restaurant.getAttribute('data-id');
        showMenu(currentRestaurantId);
    });
});

document.getElementById('back').addEventListener('click', () => {
    menuSection.style.display = 'none';
    document.getElementById('restaurants').style.display = 'block';
});

document.getElementById('confirm-order').addEventListener('click', () => {
    alert('Order confirmed! Your payment method is: ' + document.getElementById('payment-method').value);
    deliveryStatement.style.display = 'block';
    resetOrder();
});

document.getElementById('reset-order').addEventListener('click', resetOrder);

document.getElementById('submit-review').addEventListener('click', () => {
    const reviewText = document.getElementById('review-text').value;
    if (reviewText) {
        const li = document.createElement('li');
        li.textContent = reviewText;
        reviewsList.appendChild(li);
        document.getElementById('review-text').value = '';
    }
});
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Login successful!'); // Replace with actual authentication logic
    // Redirect to main page
    window.location.href = 'index.html'; // Change as needed
});

document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password === confirmPassword) {
        alert('Sign up successful!'); // Replace with actual registration logic
        // Redirect to login page
        window.location.href = 'login.html'; // Change as needed
    } else {
        alert('Passwords do not match. Please try again.');
    }
});


function showMenu(restaurantId) {
    document.getElementById('restaurants').style.display = 'none';
    menuSection.style.display = 'block';
    menuItems.innerHTML = '';
    order = [];

    menuData[restaurantId].forEach(item => {
        const li = document.createElement('li');
        
        // Create an image element
        const img = document.createElement('img');
        img.src = item.img; // Set the image source
        img.alt = item.name; // Set alt text
        img.className = 'menu-item-img'; // Add a class for styling
        img.style.width = '100px'; // Set width as needed
        img.style.height = 'auto'; // Maintain aspect ratio
        
        li.appendChild(img); // Append image to list item
        li.appendChild(document.createTextNode(`${item.name} - $${item.price}`));
        
        const button = document.createElement('button');
        button.textContent = 'Add to Order';
        button.addEventListener('click', () => addToOrder(item));
        li.appendChild(button);
        
        menuItems.appendChild(li);
    });
}


function addToOrder(item) {
    order.push(item);
    updateOrderSummary();
}

function updateOrderSummary() {
    orderSummary.style.display = 'block';
    orderList.innerHTML = '';
    order.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        orderList.appendChild(li);
    });
}

function resetOrder() {
    order = [];
    orderList.innerHTML = '';
    orderSummary.style.display = 'none';
    deliveryStatement.style.display = 'none';
    menuSection.style.display = 'none';
    document.getElementById('restaurants').style.display = 'block';
}

// Search functionality
restaurantSearch.addEventListener('input', filterRestaurants);
foodSearch.addEventListener('input', filterMenu);

function filterRestaurants() {
    const query = restaurantSearch.value.toLowerCase();
    restaurants.forEach(restaurant => {
        const name = restaurant.querySelector('h3').textContent.toLowerCase();
        restaurant.style.display = name.includes(query) ? 'block' : 'none';
    });
}

function filterMenu() {
    const query = foodSearch.value.toLowerCase();
    const items = menuData[currentRestaurantId] || [];
    menuItems.innerHTML = '';
    
    items.forEach(item => {
        if (item.name.toLowerCase().includes(query)) {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            const button = document.createElement('button');
            button.textContent = 'Add to Order';
            button.addEventListener('click', () => addToOrder(item));
            li.appendChild(button);
            menuItems.appendChild(li);
        }
    });
}
