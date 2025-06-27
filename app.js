document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown-details');

    if (!menuToggle || !navMenu) return;

    // Abrir/cerrar menú móvil
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el evento se propague al documento
        navMenu.classList.toggle('is-open');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);

        if (navMenu.classList.contains('is-open') && !isClickInsideMenu && !isClickOnToggle) {
            navMenu.classList.remove('is-open');
            // Cierra también los dropdowns <details>
            dropdowns.forEach(dropdown => dropdown.removeAttribute('open'));
        }
    });

    // Asegurar que solo un dropdown <details> esté abierto a la vez
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('toggle', (event) => {
            // Si el dropdown actual se está abriendo
            if (event.newState === 'open') {
                // Cierra todos los demás
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.removeAttribute('open');
                    }
                });
            }
        });
    });
});