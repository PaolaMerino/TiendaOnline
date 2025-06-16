
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
 
