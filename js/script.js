 document.getElementById('btn-menu').addEventListener('click', function() {
      document.getElementById('nav-container').classList.add('show');
    });
    
    document.getElementById('close-menu').addEventListener('click', function() {
      document.getElementById('nav-container').classList.remove('show');
  });
    // Función para cambiar entre secciones
    function showSection(sectionId) {
      // Ocultar todas las secciones
      document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
      });
      
      // Mostrar la sección solicitada
      document.getElementById(sectionId).classList.remove('hidden');
      
      // Actualizar navegación activa
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      document.querySelector(`.nav-link[data-target="${sectionId}"]`).classList.add('active');
    }
    
    // Configurar navegación
    document.addEventListener('DOMContentLoaded', function() {
      // Agregar event listeners a los enlaces de navegación
      const navLinks = document.querySelectorAll('.nav-link');
      
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const target = this.getAttribute('data-target');
          showSection(target);
        });
      });
      
      // Funcionalidad del slider
      const slider = document.getElementById("slider");
      const btnLeft = document.getElementById("btn-left");
      const btnRight = document.getElementById("btn-right");
      
      let currentPosition = 0;
      const slideWidth = 100 / 3; // 3 slides
      
      btnRight.addEventListener("click", function() {
        currentPosition -= slideWidth;
        if (currentPosition < -slideWidth * 2) currentPosition = 0;
        slider.style.transform = `translateX(${currentPosition}%)`;
      });
      
      btnLeft.addEventListener("click", function() {
        currentPosition += slideWidth;
        if (currentPosition > 0) currentPosition = -slideWidth * 2;
        slider.style.transform = `translateX(${currentPosition}%)`;
      });
      
      // Auto slide cada 5 segundos
      setInterval(function() {
        currentPosition -= slideWidth;
        if (currentPosition < -slideWidth * 2) currentPosition = 0;
        slider.style.transform = `translateX(${currentPosition}%)`;
      }, 5000);
      
      // Validación del formulario
      const form = document.getElementById('clientForm');
      const formMessage = document.getElementById('formMessage');
      
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación simple
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        if (name.length < 3) {
          formMessage.textContent = 'El nombre debe tener al menos 3 caracteres';
          formMessage.style.color = 'red';
          return;
        }
        
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          formMessage.textContent = 'Ingrese un correo electrónico válido';
          formMessage.style.color = 'red';
          return;
        }
        
        // Si pasa la validación
        formMessage.textContent = '¡Registro exitoso!';
        formMessage.style.color = 'green';
        form.reset();
      });
    });
// CARRITO
 // Variables globales
        let cart = [];
        const cartIcon = document.getElementById('cartIcon');
        const cartContainer = document.getElementById('cartContainer');
        const closeCart = document.getElementById('closeCart');
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const cartTotal = document.getElementById('cartTotal');
        const notification = document.getElementById('notification');
        
        // Abrir carrito
        cartIcon.addEventListener('click', () => {
            cartContainer.classList.add('open');
        });
        
        // Cerrar carrito
        closeCart.addEventListener('click', () => {
            cartContainer.classList.remove('open');
        });
        
        // Agregar productos al carrito
        document.querySelectorAll('.btn-add-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productId = productCard.dataset.id;
                const productName = productCard.dataset.name;
                const productPrice = parseFloat(productCard.dataset.price);
                
                addToCart(productId, productName, productPrice);
            });
        });
        
        // Función para agregar al carrito
        function addToCart(id, name, price) {
            // Verificar si el producto ya está en el carrito
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    quantity: 1
                });
            }
            
            // Actualizar interfaz
            updateCartUI();
            
            // Mostrar notificación
            showNotification();
        }
        
        // Actualizar interfaz del carrito
        function updateCartUI() {
            // Actualizar contador
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Actualizar lista de productos
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart-message">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Tu carrito está vacío</p>
                    </div>
                `;
                cartTotal.textContent = '$0 USD';
                return;
            }
            
            let itemsHTML = '';
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                itemsHTML += `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="https://images.unsplash.com/photo-${item.id === '1' ? '1517336714731-489689fd1ca8' : 
                            item.id === '2' ? '1598327105666-5b89351aff97' : 
                            item.id === '3' ? '1546868871-7041f2a55e12' : 
                            '1505740420928-5e560c06d30e'}?auto=format&fit=crop&w=100&q=80" alt="${item.name}">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price} USD × ${item.quantity}</div>
                        </div>
                        <div class="cart-item-total">$${itemTotal.toFixed(2)} USD</div>
                    </div>
                `;
            });
            
            cartItems.innerHTML = itemsHTML;
            cartTotal.textContent = `$${total.toFixed(2)} USD`;
        }
        
        // Mostrar notificación
        function showNotification() {
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
        
        // Botón Comprar ahora
        document.querySelectorAll('.btn-buy').forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productId = productCard.dataset.id;
                const productName = productCard.dataset.name;
                const productPrice = parseFloat(productCard.dataset.price);
                
                // Agregar al carrito
                addToCart(productId, productName, productPrice);
                
                // Abrir carrito
                cartContainer.classList.add('open');
            });
        });
        
        // Inicializar carrito
        updateCartUI();
 
