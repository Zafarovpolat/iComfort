// cart-page.js - Страница корзины
document.addEventListener('DOMContentLoaded', function () {
    const cartEmpty = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartItemsCountEl = document.getElementById('cart-items-count');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    function renderCart() {
        const items = cart.items;

        if (items.length === 0) {
            cartEmpty.style.display = 'flex';
            cartContent.style.display = 'none';
            return;
        }

        cartEmpty.style.display = 'none';
        cartContent.style.display = 'grid';

        // Отобразить товары
        cartItemsContainer.innerHTML = items.map(item => `
            <div class="cart-item">
                <div class="cart-item__image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item__details">
                    <h3>${item.name}</h3>
                    ${item.color ? `<p>Цвет: ${item.color}</p>` : ''}
                    ${item.storage ? `<p>Память: ${item.storage}</p>` : ''}
                </div>
                <div class="cart-item__quantity">
                    <button class="qty-btn" onclick="updateItemQuantity('${item.id}', '${item.color}', '${item.storage}', ${item.quantity - 1})">
                        <i class='bx bx-minus'></i>
                    </button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateItemQuantity('${item.id}', '${item.color}', '${item.storage}', ${item.quantity + 1})">
                        <i class='bx bx-plus'></i>
                    </button>
                </div>
                <div class="cart-item__price">
                    ${formatPrice(item.price * item.quantity)}
                </div>
                <button class="cart-item__remove" onclick="removeFromCart('${item.id}', '${item.color}', '${item.storage}')">
                    <i class='bx bx-trash'></i>
                </button>
            </div>
        `).join('');

        // Обновить итоги
        const itemCount = cart.getItemCount();
        const total = cart.getTotal();

        cartItemsCountEl.textContent = itemCount;
        cartSubtotalEl.textContent = formatPrice(total);
        cartTotalEl.textContent = formatPrice(total);
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
    }

    // Глобальные функции для использования в onclick
    window.updateItemQuantity = function (id, color, storage, quantity) {
        cart.updateQuantity(id, color, storage, quantity);
        renderCart();
    };

    window.removeFromCart = function (id, color, storage) {
        cart.removeItem(id, color, storage);
        renderCart();
    };

    // Оформление заказа
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Функция оформления заказа в разработке');
            // Здесь будет переход на страницу оформления
        });
    }

    // Первичная отрисовка
    renderCart();
});