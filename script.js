// Politik Deutschland - JavaScript

// Globale Variablen
let currentSection = 'home';
let wahlErgebnisse = {};
let hatGevotet = false;

// Fiktive Parteien Daten
const fiktiveParteien = [
    {
        id: 'zukunftspartei',
        name: 'Zukunftspartei Deutschland',
        logo: 'ZD',
        farbe: '#00a86b',
        programm: [
            'Digitalisierung aller Schulen bis 2026',
            'Kostenloses WLAN in allen öffentlichen Gebäuden',
            'Mehr Investitionen in erneuerbare Energien',
            'Verkürzte Schulzeit durch effizientere Lernmethoden',
            'Jugendparlament mit echten Mitbestimmungsrechten'
        ]
    },
    {
        id: 'umweltunion',
        name: 'Umweltunion für Morgen',
        logo: 'UM',
        farbe: '#228b22',
        programm: [
            'Verbot von Einwegplastik bis 2025',
            'Autofreie Innenstädte am Wochenende',
            'Pflichtfach Umweltschutz in allen Schulen',
            'Mehr Grünflächen und Urban Gardening',
            'Kostenloser öffentlicher Nahverkehr für Schüler'
        ]
    },
    {
        id: 'sozialepartei',
        name: 'Soziale Gerechtigkeit Jetzt',
        logo: 'SG',
        farbe: '#dc143c',
        programm: [
            'Kostenloses Mittagessen für alle Schüler',
            'Mehr Sozialarbeiter an Schulen',
            'Günstigere Freizeitangebote für Jugendliche',
            'Erhöhung des Mindestlohns für Auszubildende',
            'Bessere Integration von Migranten'
        ]
    },
    {
        id: 'innovationspartei',
        name: 'Innovation & Fortschritt',
        logo: 'IF',
        farbe: '#4169e1',
        programm: [
            'KI-gestützter Unterricht in MINT-Fächern',
            'Start-up Förderung für Schüler',
            'Robotik-AGs an allen Schulen',
            'Digitale Lernplattformen für zu Hause',
            'Praktika in Technologie-Unternehmen'
        ]
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const overviewCards = document.querySelectorAll('.overview-card');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
});

// Website Initialisierung
function initializeWebsite() {
    showSection('home');
    loadFiktiveParteien();
    loadWahlFormular();
    
    // Prüfe ob bereits gevoted wurde (in einer echten App würde das serverseitig passieren)
    const hasVoted = localStorage.getItem('hasVoted');
    if (hasVoted) {
        hatGevotet = true;
        document.getElementById('wahlButton').disabled = true;
        document.getElementById('wahlButton').textContent = 'Bereits abgestimmt';
        document.getElementById('wahl-bestaetigung').classList.remove('hidden');
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Mobile Menu Toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            closeMobileMenu();
        });
    });
    
    // Overview Cards
    overviewCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });
    
    // Wahl Formular
    const wahlForm = document.getElementById('wahlForm');
    if (wahlForm) {
        wahlForm.addEventListener('submit', submitVote);
    }
}

// Mobile Menu Functions
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Update navigation active state
        updateNavigation(sectionId);
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

function updateNavigation(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });
}

// Fiktive Parteien laden
function loadFiktiveParteien() {
    const container = document.getElementById('fiktive-parteien');
    const plakateContainer = document.getElementById('plakate-container');
    
    if (!container || !plakateContainer) return;
    
    container.innerHTML = '';
    plakateContainer.innerHTML = '';
    
    fiktiveParteien.forEach(partei => {
        // Partei Card erstellen
        const parteiCard = createParteiCard(partei);
        container.appendChild(parteiCard);
        
        // Plakat erstellen
        const plakat = createPlakat(partei);
        plakateContainer.appendChild(plakat);
    });
}

function createParteiCard(partei) {
    const card = document.createElement('div');
    card.className = 'fiktive-partei';
    
    card.innerHTML = `
        <div class="partei-header">
            <div class="partei-logo" style="background: ${partei.farbe}">
                ${partei.logo}
            </div>
            <h3 class="partei-name">${partei.name}</h3>
        </div>
        <div class="partei-programm">
            <h4>Unser Programm:</h4>
            <ul>
                ${partei.programm.map(punkt => `<li>${punkt}</li>`).join('')}
            </ul>
        </div>
    `;
    
    return card;
}

function createPlakat(partei) {
    const plakat = document.createElement('div');
    plakat.className = 'plakat';
    
    // Einfache Plakat-Simulation
    const slogans = [
        'Für eine bessere Zukunft!',
        'Gemeinsam stark!',
        'Deine Stimme zählt!',
        'Zeit für Veränderung!',
        'Wir hören zu!'
    ];
    
    const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];
    
    plakat.innerHTML = `
        <div class="plakat-bild" style="background: linear-gradient(135deg, ${partei.farbe}, ${partei.farbe}dd)">
            <div>
                <div style="font-size: 2rem; margin-bottom: 1rem;">${partei.logo}</div>
                <div style="font-weight: bold; margin-bottom: 0.5rem;">${partei.name}</div>
                <div style="font-style: italic;">"${randomSlogan}"</div>
            </div>
        </div>
        <div class="plakat-info">
            <h4>${partei.name}</h4>
            <p>Wahlplakat ${partei.id}</p>
        </div>
    `;
    
    return plakat;
}

// Wahl Formular
function loadWahlFormular() {
    const kandidatenListe = document.getElementById('kandidatenListe');
    if (!kandidatenListe) return;
    
    kandidatenListe.innerHTML = '';
    
    fiktiveParteien.forEach((partei, index) => {
        const option = document.createElement('label');
        option.className = 'kandidat-option';
        
        option.innerHTML = `
            <input type="radio" name="wahl" value="${partei.id}" id="partei-${partei.id}">
            <div class="kandidat-info">
                <div class="kandidat-name">${partei.name}</div>
                <div class="kandidat-partei">Listenplatz ${index + 1}</div>
            </div>
            <div class="partei-logo" style="background: ${partei.farbe}; width: 40px; height: 40px; font-size: 1rem;">
                ${partei.logo}
            </div>
        `;
        
        kandidatenListe.appendChild(option);
    });
}

// Vote Submit
function submitVote(e) {
    e.preventDefault();
    
    if (hatGevotet) {
        alert('Du hast bereits abgestimmt!');
        return;
    }
    
    const formData = new FormData(e.target);
    const gewaehlteParte = formData.get('wahl');
    
    if (!gewaehlteParte) {
        alert('Bitte wähle eine Partei aus!');
        return;
    }
    
    // Stimme registrieren
    if (!wahlErgebnisse[gewaehlteParte]) {
        wahlErgebnisse[gewaehlteParte] = 0;
    }
    wahlErgebnisse[gewaehlteParte]++;
    
    // In localStorage speichern (in einer echten App wäre das eine Datenbank)
    localStorage.setItem('wahlErgebnisse', JSON.stringify(wahlErgebnisse));
    localStorage.setItem('hasVoted', 'true');
    
    hatGevotet = true;
    
    // UI Update
    document.getElementById('wahlButton').disabled = true;
    document.getElementById('wahlButton').textContent = 'Bereits abgestimmt';
    document.getElementById('wahl-bestaetigung').classList.remove('hidden');
    
    // Ergebnisse aktualisieren
    updateErgebnisse();
    
    // Animation
    setTimeout(() => {
        alert('Vielen Dank für deine Stimme! 🗳️');
    }, 500);
}

// Ergebnisse laden und anzeigen
function loadErgebnisse() {
    const gespeicherteErgebnisse = localStorage.getItem('wahlErgebnisse');
    if (gespeicherteErgebnisse) {
        wahlErgebnisse = JSON.parse(gespeicherteErgebnisse);
    }
    updateErgebnisse();
}

function updateErgebnisse() {
    const chartContainer = document.getElementById('ergebnis-chart');
    const detailsContainer = document.getElementById('ergebnis-details');
    
    if (!chartContainer || !detailsContainer) return;
    
    // Gesamtstimmen berechnen
    const gesamtStimmen = Object.values(wahlErgebnisse).reduce((sum, stimmen) => sum + stimmen, 0);
    
    if (gesamtStimmen === 0) {
        chartContainer.innerHTML = '<div class="chart-placeholder"><p>Noch keine Stimmen abgegeben</p></div>';
        detailsContainer.innerHTML = '';
        return;
    }
    
    // Chart erstellen
    let chartHTML = '';
    const sortierteErgebnisse = Object.entries(wahlErgebnisse)
        .map(([parteiId, stimmen]) => {
            const partei = fiktiveParteien.find(p => p.id === parteiId);
            return {
                partei: partei,
                stimmen: stimmen,
                prozent: ((stimmen / gesamtStimmen) * 100).toFixed(1)
            };
        })
        .sort((a, b) => b.stimmen - a.stimmen);
    
    sortierteErgebnisse.forEach(ergebnis => {
        if (ergebnis.partei) {
            chartHTML += `
                <div class="chart-bar">
                    <div class="chart-label">
                        <span>${ergebnis.partei.name}</span>
                        <span>${ergebnis.stimmen} Stimmen (${ergebnis.prozent}%)</span>
                    </div>
                    <div class="chart-progress">
                        <div class="chart-fill" style="width: ${ergebnis.prozent}%; background: ${ergebnis.partei.farbe};">
                            ${ergebnis.prozent}%
                        </div>
                    </div>
                </div>
            `;
        }
    });
    
    chartContainer.innerHTML = chartHTML;
    
    // Details anzeigen
    detailsContainer.innerHTML = `
        <p><strong>Gesamtstimmen:</strong> ${gesamtStimmen}</p>
        <p><strong>Wahlbeteiligung:</strong> Sehr hoch! 📈</p>
        <p><em>Die Ergebnisse werden live aktualisiert.</em></p>
    `;
}

// Smooth Scrolling für Anchor Links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Resize Handler für responsive Updates
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Scroll Handler für Navigation Highlighting
window.addEventListener('scroll', function() {
    // Optional: Add scroll-based navigation highlighting
    // This would require more complex logic to determine which section is currently visible
});

// Zusätzliche Utility Functions
function formatNumber(num) {
    return num.toLocaleString('de-DE');
}

function getRandomColor() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function showNotification(message, type = 'info') {
    // Einfache Notification (könnte erweitert werden)
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// CSS für Notification Animation hinzufügen
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    // Ergebnisse beim Laden der Seite aktualisieren
    loadErgebnisse();
    
    // Automatische Updates alle 5 Sekunden (simuliert Live-Updates)
    setInterval(loadErgebnisse, 5000);
});

// Export für eventuelle Tests (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fiktiveParteien,
        showSection,
        loadFiktiveParteien,
        updateErgebnisse
    };
}

