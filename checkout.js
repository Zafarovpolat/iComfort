// checkout.js - Логика оформления заказа
document.addEventListener('DOMContentLoaded', function () {
    const orderItemsList = document.getElementById('order-items-list');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTotal = document.getElementById('checkout-total');
    const deliveryCostEl = document.getElementById('delivery-cost');
    const checkoutForm = document.getElementById('checkout-form');
    const successModal = document.getElementById('success-modal');
    const orderNumberSpan = document.getElementById('order-number');

    // Загрузка корзины из LocalStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];

    // Если корзина пуста, редирект в каталог
    if (cartData.length === 0) {
        window.location.href = 'catalog.html';
        return;
    }

    // Рендер товаров в боковой панели
    function renderOrderSummary() {
        let subtotal = 0;
        orderItemsList.innerHTML = '';

        cartData.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            orderItemsList.innerHTML += `
                <div class="order-item-mini">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="order-item-info">
                        <h4>${item.name}</h4>
                        <div class="order-item-meta">
                            ${item.color ? item.color : ''} ${item.storage ? `• ${item.storage}` : ''}
                        </div>
                        <div class="order-item-meta">Кол-во: ${item.quantity}</div>
                        <div class="order-item-price">${formatPrice(itemTotal)}</div>
                    </div>
                </div>
            `;
        });

        checkoutSubtotal.textContent = formatPrice(subtotal);

        // Расчет доставки (для примера)
        const isCourier = document.querySelector('input[name="delivery"]:checked').value === 'courier';
        const deliveryPrice = isCourier ? 30000 : 0; // 30 000 сум доставка

        deliveryCostEl.textContent = isCourier ? formatPrice(deliveryPrice) : 'Бесплатно';
        checkoutTotal.textContent = formatPrice(subtotal + deliveryPrice);
    }

    // Форматирование цены
    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
    }

    // Переключение полей доставки
    window.toggleDelivery = function (method) {
        const addressFields = document.getElementById('address-fields');
        const pickupInfo = document.getElementById('pickup-info');
        const deliveryInputs = addressFields.querySelectorAll('input, select, textarea');

        if (method === 'courier') {
            addressFields.style.display = 'block';
            pickupInfo.style.display = 'none';
            // Делаем поля обязательными
            deliveryInputs.forEach(input => {
                if (input.name !== 'comment') input.required = true;
            });
        } else {
            addressFields.style.display = 'none';
            pickupInfo.style.display = 'block';
            // Убираем обязательность
            deliveryInputs.forEach(input => input.required = false);
        }
        renderOrderSummary(); // Пересчитать итог (доставка платная/бесплатная)
    };

    // Маска для телефона (простая)
    const phoneInput = document.getElementById('phone-input');
    phoneInput.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
        if (!x[2] && x[1].length < 3) {
            // Если стирают код страны, вернуть его (опционально)
        }
        e.target.value = !x[2] ? '+998' : '+998 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    });

    // Обработка формы
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Имитация загрузки
        const btn = document.querySelector('.checkout-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Обработка...';
        btn.disabled = true;

        setTimeout(() => {
            // Генерация номера заказа

            // Начисляем 1% кэшбэка
            const totalText = document.getElementById('checkout-total').textContent;
            const totalAmount = parseInt(totalText.replace(/\D/g, ''));
            const cashback = Math.floor(totalAmount * 0.01); // 1%

            let currentPoints = parseInt(localStorage.getItem('points') || '0');
            localStorage.setItem('points', currentPoints + cashback);

            // ... остальной код ...

            const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
            orderNumberSpan.textContent = '#' + randomOrderNum;

            // Показать модалку
            successModal.classList.add('active');

            // Очистить корзину
            localStorage.removeItem('cart');

            // Можно здесь добавить логику отправки данных в Telegram/Email

        }, 1500);
    });

    // Инициализация
    renderOrderSummary();
    // Установка начального состояния полей доставки
    toggleDelivery('courier');
});