
const canvas = document.getElementById('matrix-bg');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;
const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

// --- TU FUNCIÓN DE DIBUJO (INTACTA) ---
// Esta función crea el efecto de pulso que te gusta.
let frameCount = 0;
const draw = () => {
    // 1. Dibuja el rectángulo de fondo para crear el efecto de estela
    context.fillStyle = 'rgba(0, 0, 0, 0.1)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Calcula la opacidad actual usando una onda sinusoidal para un pulso suave
    const pulse = Math.sin(frameCount * 0.005);
    const currentOpacity = (pulse + 1) / 2 * 0.6; // El 0.6 es la opacidad máxima

    // 3. Establece el color de las letras con la opacidad calculada
    context.fillStyle = `rgba(13, 255, 0, ${currentOpacity})`;
    context.font = fontSize + 'px monospace';

    // 4. Dibuja los caracteres que caen
    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]+= 0.6;
    }

    // Incrementa el contador de fotogramas para el siguiente pulso
    frameCount++;
};


// --- NUEVO CONTROLADOR DE ANIMACIÓN ---
// Este bucle controla CUÁNDO se ejecuta tu función de dibujo.

let cycleStartTimestamp = 0; // Guardará el tiempo de inicio de cada ciclo
const VISIBLE_DURATION = 3000; // 3 segundos
const INVISIBLE_DURATION = 17000; // 13 segundos
const TOTAL_CYCLE_DURATION = VISIBLE_DURATION + INVISIBLE_DURATION; // 16 segundos en total

function animationController(timestamp) {
    // Initialize timestamp on the first frame
    if (!cycleStartTimestamp) {
        cycleStartTimestamp = timestamp;
    }

    // Calculate how far we are into the current 16-second cycle
    const elapsed = timestamp - cycleStartTimestamp;

    // Check if we are in the visible part of the cycle
    if (elapsed < VISIBLE_DURATION) {
        // If han pasado menos de 3 segundos, ejecuta tu animación de pulso
        draw();
    } else {
        // NEW FADE-OUT LOGIC:
        // After 3 seconds, instead of clearing to black instantly,
        // we draw a semi-transparent black rectangle on each frame.
        // This makes the existing image on the canvas slowly fade to black.
        context.fillStyle = 'rgba(0, 0, 0, 0.05)'; // You can change 0.05 to make it fade faster or slower
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Check if the total cycle duration has passed
    if (elapsed > TOTAL_CYCLE_DURATION) {
        // Reset the timer to start a new cycle
        cycleStartTimestamp = timestamp;
        // Optional: reset the frameCount so the pulse starts fresh
        frameCount = 0;
    }

    // Request the next frame to continue the loop
    requestAnimationFrame(animationController);
}

    // Pide al navegador que ejecute esta función de nuevo en el siguiente fotograma
    requestAnimationFrame(animationController);


// Inicia el controlador maestro de la animación
requestAnimationFrame(animationController);


// Ajusta el canvas si el tamaño de la ventana cambia
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});





// --- Share Button Functionality ---

// Find the share button by its ID
const shareButton = document.getElementById('share-button');

// Add an event listener for when the button is clicked
shareButton.addEventListener('click', async (event) => {
    // Prevent the link from trying to navigate away
    event.preventDefault();

    // Data to be shared
    const shareData = {
        title: 'Portafolio de Oscar Martinez',
        text: 'Echa un vistazo al portafolio y los proyectos de Oscar.',
        url: window.location.href // The URL of the current page
    };

    // Check if the browser supports the Web Share API
    if (navigator.share) {
        try {
            // If supported, open the native share dialog
            await navigator.share(shareData);
            console.log('Contenido compartido con éxito!');
        } catch (err) {
            console.error('Error al compartir:', err);
        }
    } else {
        // --- Fallback for other browsers ---
        try {
            // If not supported, copy the URL to the clipboard
            await navigator.clipboard.writeText(window.location.href);
            
            // Temporarily change the button text to give feedback
            const originalText = shareButton.innerHTML;
            shareButton.innerHTML = '¡Enlace Copiado!';
            
            // Change it back after 2 seconds
            setTimeout(() => {
                shareButton.innerHTML = originalText;
            }, 2000);

        } catch (err) {
            console.error('No se pudo copiar el enlace:', err);
        }
    }
});

