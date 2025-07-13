document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURACIÓN ---
    const CORRECT_PASSWORD = '2025';

    // --- ELEMENTOS DEL DOM ---
    const passwordGate = document.getElementById('password-gate');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const mainContent = document.getElementById('main-content');

    // --- NUEVA LÓGICA: Comprobar al cargar la página ---
    // Revisa si el usuario ya fue autenticado en esta sesión.
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
        // Si es así, salta la pantalla de contraseña y muestra el contenido.
        passwordGate.style.display = 'none';
        mainContent.classList.remove('hidden');
    }

    // --- LÓGICA DEL FORMULARIO ---
    passwordForm.addEventListener('submit', (event) => {
        // Previene que la página se recargue al enviar el formulario
        event.preventDefault();

        const enteredPassword = passwordInput.value;

        // Comprueba si la contraseña es correcta
        if (enteredPassword === CORRECT_PASSWORD) {
            // --- NUEVA LÍNEA: Guardar el estado de autenticación ---
            // Guarda en la memoria de la sesión que la contraseña es correcta.
            sessionStorage.setItem('isAuthenticated', 'true');

            // Oculta la pantalla de contraseña y muestra el contenido
            console.log('Acceso concedido.');
            passwordGate.style.display = 'none';
            mainContent.classList.remove('hidden');
        } else {
            // Si es incorrecta, muestra un mensaje de error
            console.log('Acceso denegado.');
            errorMessage.textContent = '> ACCESO DENEGADO. INTÉNTALO DE NUEVO.';
            // Limpia el campo de la contraseña
            passwordInput.value = '';
        }
    });
});