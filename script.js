const menuData = {
    1: [
        { name: "Margherita Pizza", price: 10 },
        { name: "Paneer Pizza", price: 12 },
        { name: "Veggie Pizza", price: 11 },
    ],
    2: [
        { name: "Cheese Burger", price: 8 },
        { name: "Butter Burger", price: 9 },
        { name: "Mushroom Burger", price: 7 },
    ],
    3: [
        { name: "Flat White", price: 15 },
        { name: "Classic Cappaccino", price: 10 },
        { name: "Toffee Latte", price: 16 },
    ],
};

const restaurants = document.querySelectorAll('.restaurant');
const menuSection = document.getElementById('menu');
const menuItems = document.getElementById('menu-items');
const orderSummary = document.getElementById('order-summary');
const orderList = document.getElementById('order-list');
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
    alert('Order confirmed!');
    resetOrder();
});

document.getElementById('reset-order').addEventListener('click', resetOrder);

function showMenu(restaurantId) {
    document.getElementById('restaurants').style.display = 'none';
    menuSection.style.display = 'block';
    menuItems.innerHTML = '';
    order = [];

    menuData[restaurantId].forEach(item => {
        const li = document.createElement('li');
        li.textContent = ${item.name} - $${item.price};
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
        li.textContent = ${item.name} - $${item.price};
        orderList.appendChild(li);
    });
}

function resetOrder() {
    order = [];
    orderList.innerHTML = '';
    orderSummary.style.display = 'none';
    menuSection.style.display = 'none';
    document.getElementById('restaurants').style.display = 'block';
}
