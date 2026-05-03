document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Chatbot UI Logic
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatbotBody = document.getElementById('chatbot-body');
    const chips = document.querySelectorAll('.chip');

    const toggleChat = () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            chatInput.focus();
        }
    };

    chatbotToggle.addEventListener('click', toggleChat);
    chatbotClose.addEventListener('click', toggleChat);

    const appendUserMessage = (msg) => {
        if (!msg.trim()) return;
        
        // Remove suggestions if they exist
        const suggestions = document.querySelector('.chatbot-suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }

        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg user';
        msgDiv.textContent = msg;
        chatbotBody.appendChild(msgDiv);
        
        // Simulate thinking and AI response
        setTimeout(() => {
            const replyDiv = document.createElement('div');
            replyDiv.className = 'chat-msg system';
            replyDiv.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';
            chatbotBody.appendChild(replyDiv);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;

            setTimeout(() => {
                replyDiv.innerHTML = "I am a dummy AI Concierge. In the future, I will connect to an AI API to assist you with styling and support.";
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
            }, 1000);
        }, 500);

        chatInput.value = '';
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    };

    chatSend.addEventListener('click', () => {
        appendUserMessage(chatInput.value);
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            appendUserMessage(chatInput.value);
        }
    });

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            appendUserMessage(chip.textContent);
        });
    });

    // --- Real Cart Logic ---
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');
    const cartBadge = document.getElementById('cart-badge');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    let cart = JSON.parse(localStorage.getItem('aura_cart')) || [];

    const toggleCart = () => {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    };

    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart();
    });

    cartClose.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    const updateCartUI = () => {
        // Update badge
        cartBadge.textContent = cart.length;
        
        // Render items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg" id="empty-cart-msg">Your bag is currently empty.</div>';
            cartTotalPrice.textContent = '$0';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                    <button class="cart-item-remove" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total += item.price;
        });

        cartTotalPrice.textContent = '$' + total.toLocaleString();

        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    };

    window.addToCart = (id, name, price, img) => {
        cart.push({ id, name, price, img });
        localStorage.setItem('aura_cart', JSON.stringify(cart));
        updateCartUI();
        toggleCart();
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('aura_cart', JSON.stringify(cart));
        updateCartUI();
    };

    // Initialize UI on load
    updateCartUI();
});
