// script.js

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const toggleIcon = darkModeToggle.querySelector('i');

    // --- Lógica del Modo Oscuro ---

    // Función para activar el modo oscuro
    const enableDarkMode = () => {
        body.classList.add('dark');
        toggleIcon.classList.remove('fa-moon');
        toggleIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
        darkModeToggle.setAttribute('aria-label', 'Activar modo claro');
    };

    // Función para desactivar el modo oscuro
    const disableDarkMode = () => {
        body.classList.remove('dark');
        toggleIcon.classList.remove('fa-sun');
        toggleIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
        darkModeToggle.setAttribute('aria-label', 'Activar modo oscuro');
    };

    // Event listener para el botón de toggle
    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }    
    });

    // Comprobar preferencia del sistema y localStorage al cargar la página
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        enableDarkMode();
    } else if (currentTheme === 'light') {
        disableDarkMode();
    } else if (prefersDarkScheme.matches) {
        enableDarkMode();
    }

    // Escuchar cambios en la preferencia del sistema
    prefersDarkScheme.addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === null) { // Solo si el usuario no ha elegido un tema
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });


    // --- Lógica del Smooth Scroll ---
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Asegurarse de que es un ancla interna
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // --- Lógica del Formulario de Contacto ---
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Previene el envío real del formulario

        // Simulación de validación (Bootstrap se encarga del feedback visual)
        if (this.checkValidity()) {
            alert('¡Mensaje enviado! 📧 Gracias por contactarme.');
            this.reset(); // Limpia el formulario después del envío
        } else {
            // Fuerza la muestra de errores de validación de Bootstrap
            this.classList.add('was-validated');
        }
    });
});