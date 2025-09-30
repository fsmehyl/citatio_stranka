document.addEventListener('DOMContentLoaded', () => {

    
    // --- ČASŤ PRE PADAJÚCE IKONY ---
    // Pole ikon (emoji), ktoré sa budú objavovať
    const icons = ['📜', '❤️', '🚀', '😀', '🧠', '💀', '🌱', '⭐', '💡', '🎉', '👍'];

    // Premenné na sledovanie pohybu myši a časovania ikon
    let lastX = 0;
    let lastY = 0;
    let lastIconTime = 0;
    const iconCooldown = 500; // Znížený cooldown na 100ms pre častejšie ikony pri pohybe
    const minMoveDistance = 15; // Minimálna vzdialenosť pohybu myši na vytvorenie ikony

    document.body.addEventListener('mousemove', (event) => {
        const currentTime = Date.now();
        const currentX = event.clientX;
        const currentY = event.clientY;

        // Vypočítame vzdialenosť od poslednej pozície
        const distance = Math.sqrt(Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2));

        // Skontrolujeme, či uplynul cooldown a či sa myš pohla dostatočne
        if (currentTime - lastIconTime > iconCooldown && distance >= minMoveDistance) {
            createFallingIcon(currentX, currentY);
            lastX = currentX;
            lastY = currentY;
            lastIconTime = currentTime;
        }
    });

    function createFallingIcon(x, y) {
        // Náhodne vyberieme ikonu z poľa
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];

        // Vytvoríme nový element pre ikonu
        const iconElement = document.createElement('span');
        iconElement.classList.add('falling-icon');
        iconElement.textContent = randomIcon;

        // Nastavíme počiatočnú pozíciu podľa kurzora s náhodným posunom
        const offsetX = (Math.random() - 0.5) * 20; // Náhodný posun X (-10px až +10px)
        const offsetY = (Math.random() - 0.5) * 10; // Náhodný posun Y (-5px až +5px)
        iconElement.style.left = `${x + offsetX}px`;
        iconElement.style.top = `${y + offsetY}px`;

        // Pridáme ikonu na stránku
        document.body.appendChild(iconElement);

        // Po skončení animácie ikonu odstránime z DOM
        iconElement.addEventListener('animationend', () => {
            iconElement.remove();
        });
    }

    const images = document.querySelectorAll(".image-slider-inside img");
    let current = 0;

    setInterval(() => {
        images[current].classList.remove("active");
        current = (current + 1) % images.length;
        images[current].classList.add("active");
    }, 3000); // Každé 3 sekundy
});