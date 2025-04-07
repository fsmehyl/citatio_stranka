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

    // --- ČASŤ PRE SLIDER OBRÁZKOV ---

    // Vyberieme všetky obrázky vnútri kontajnera .image-slider
    // *** TOTO JE HLAVNÁ ZMENA v selektore ***
    const slides = document.querySelectorAll('.image-slider img');
    let currentSlideIndex = 0;
    const slideInterval = 4000; // Interval v milisekundách (4 sekundy)

    // Funkcia na zobrazenie konkrétneho slajdu
    function showSlide(index) {
        // Skontrolujeme, či máme nejaké slajdy
        if (slides.length === 0) return;

        // Skryjeme všetky slajdy odstránením triedy 'active'
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Zabezpečíme, že index je vždy platný (pre prípad chyby)
        const validIndex = (index % slides.length + slides.length) % slides.length;

        // Zobrazíme slajd na danom indexe pridaním triedy 'active'
        if (slides[validIndex]) {
            slides[validIndex].classList.add('active');
        }
    }

    // Funkcia na zobrazenie nasledujúceho slajdu
    function nextSlide() {
        // Prejdeme na ďalší index
        currentSlideIndex = (currentSlideIndex + 1) % slides.length; // Modulo zabezpečí zacyklenie
        showSlide(currentSlideIndex);
    }

    // Inicializácia slidera
    if (slides.length > 0) {
        // Uistíme sa, že na začiatku má triedu 'active' iba prvý obrázok
        // (HTML by to malo zabezpečiť, ale pre istotu)
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        currentSlideIndex = 0; // Reset indexu pre istotu

        // Nastavíme interval pre automatické prepínanie
        setInterval(nextSlide, slideInterval);
    } else {
        // Vypíšeme do konzoly, ak sa nenašli žiadne obrázky v slideri
        console.log("Nenašli sa žiadne obrázky pre slider v elemente '.image-slider'.");
    }
});