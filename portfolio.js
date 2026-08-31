// Check saved preference and system setting on page load
const savedTheme = localStorage.getItem('theme');
const systemThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme == 'dark' || (!savedTheme && systemThemeIsDark)) {
    document.body.classList.add("dark");
} else {
    document.body.classList.remove("dark");
}

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark");
    // Save user's choice
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    init();
}

// --------------

const ham = document.querySelector("#hamburger");
const nav = document.querySelector("nav");

// Only initialize a single click listener
ham.addEventListener("click", function () {
    if (nav.style.left === "-300px") {
        nav.style.left = "0";
    } else {
        nav.style.left = "-300px";
    }
});

function hamNav() {
    if (window.innerWidth < 768) {
        // Initialize nav positioning for small screens
        nav.style.left = "-300px";
    } else {
        // Reset nav on large screens or when leaving small screen mode
        nav.style.left = null;
    }
}

// Call on initial page load
hamNav();
// Call on screen resize
window.addEventListener('resize', hamNav);

// --------------

// Intersection Observers
const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    })
}, {});
const slideInElements = document.querySelectorAll(".slide-in");
slideInElements.forEach(el => slideObserver.observe(el));
const slideUpElements = document.querySelectorAll(".slide-up");
slideUpElements.forEach(el => slideObserver.observe(el));
const slideClickElements = document.querySelectorAll(".click-in");
slideClickElements.forEach(el => slideObserver.observe(el));

const waveObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Select all children of any type
            const items = entry.target.querySelectorAll(":scope > *");
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add("wave-in");
                }, index * 70);
            })
        }
    })
}, {});
const waveInElements = document.querySelectorAll(".wave-in-section");
waveInElements.forEach(el => waveObserver.observe(el));

// --------------

if (onPage === "experience") {
    const experience = document.querySelector("#experience");
    const additional = document.querySelector("#additional");

    // Desktop-only function
    // Calculate and set the height of the experience section
    function setExperienceHeight() {
        const expItems = document.querySelectorAll("#experience .click-open-content");
        var maxHeight = 0;

        expItems.forEach(item => {
            maxHeight = Math.max(maxHeight, item.scrollHeight);
        });

        // 24 line height of h3, 20 gap under h3, 50 bottom padding
        experience.style.height = (maxHeight + 94) + "px";
    }

    // --------------

    function sectionAccordion(section) {
        // Variables to toggle the items
        const clkBtn = section.querySelectorAll(".click-open-btn");
        const clkCtn = section.querySelectorAll(".click-open-content");
        let last_opened = 0;

        // Initialize padding
        for (let i = 0; i < clkCtn.length; i++) {
            clkCtn[i].style.padding = "0px";
        }

        // Open the first item by default
        clkCtn[0].style.height = "max-content";
        clkCtn[0].style.padding = "10px";
        clkBtn[0].style.backgroundColor = "var(--c-primary-dark)";

        for (let i = 0; i < clkBtn.length; i++) {
            clkBtn[i].addEventListener("click", function (event) {
                // Close the last opened section
                clkCtn[last_opened].style.height = null;
                clkCtn[last_opened].style.padding = "0";
                clkBtn[last_opened].style.backgroundColor = "var(--c-primary)";

                if (clkCtn[i].style.height) {
                    clkCtn[i].style.height = null;
                    clkCtn[i].style.padding = "0";
                } else {
                    clkCtn[i].style.height = "max-content";
                    clkCtn[i].style.padding = "10px";
                    clkBtn[i].style.backgroundColor = "var(--c-primary-dark)";
                    // Set a new last opened section
                    last_opened = i;
                }
            });
        }
    }

    // Run the accordion for both sections
    sectionAccordion(experience);
    sectionAccordion(additional);

    // --------------

    // Run "desktop mode" if desktop
    var expScreenIsDesktop = window.innerWidth >= 768;

    function checkDesktop() {
        var expResizedToDesktop = window.innerWidth >= 768;

        if (expResizedToDesktop && !expScreenIsDesktop) {
            // Just resized into desktop mode
            // Enable desktop mode

            // Wipe padding for all but first
            const expCtn = experience.querySelectorAll(".click-open-content");
            const addtCtn = additional.querySelectorAll(".click-open-content");
            for (let i = 1; i < expCtn.length; i++) {
                expCtn[i].style.padding = "0px";
            }
            for (let i = 1; i < addtCtn.length; i++) {
                addtCtn[i].style.padding = "0px";
            }

            setExperienceHeight();

        } else if (!expResizedToDesktop && expScreenIsDesktop) {
            // Just resized into mobile mode
            // Disable desktop mode
            experience.style.removeProperty("height");

            const clkCtn = document.querySelectorAll(".click-open-content");
            for (let i = 0; i < clkCtn.length; i++) {
                clkCtn[i].style.padding = "10px";
            }

        } else if (expResizedToDesktop && expScreenIsDesktop) {
            // Screen initialized to desktop
            setExperienceHeight();
        } else {
            // Screen initialized to mobile
            experience.style.removeProperty("height");

            const clkCtn = document.querySelectorAll(".click-open-content");
            for (let i = 0; i < clkCtn.length; i++) {
                clkCtn[i].style.padding = "10px";
            }
        }

        expScreenIsDesktop = expResizedToDesktop;
    }

    // Run on load
    window.addEventListener("load", checkDesktop);
    // Run on resize
    window.addEventListener("resize", checkDesktop);
}

// --------------

function emailToClipboard() {
    const email = "naima.zida8@gmail.com";

    // Clipboard API
    navigator.clipboard.writeText(email).then(function () {
        alert("Email copied to clipboard!");
    }).catch(function (err) {
        console.error("Could not copy email");
    });
}

// --------------

const publicKey = "xfbPdiVD70qK8vTY3";
const serviceId = "service_g63duhk";
const templateId = "template_nphcapj";
if (onPage === "index") {
    emailjs.init(publicKey);
}

// Form validation
function validateMessage(input) {
    // Check all required content was entered
    if (!input.name || !input.contact || !input.message) {
        alert("Please fill out all required information before sending your message.")
        return false;
    }
    return true;
}

// Form submission
const sendEmail = async (event) => {
    event.preventDefault(); // Stops browser from refershing before email is 
    const form = event.target;

    const inputFields = {
        name: form.name.value,
        contact: form.contact.value,
        message: form.message.value,
    };

    if (validateMessage(inputFields)) {
        try {
            const sendResult = await emailjs.send(serviceId, templateId, inputFields);
            console.log("SUCCESS", sendResult.status, sendResult.text);
            alert("Your message has been sent successfully. Thank you!");

            form.reset();
        } catch (error) {
            console.error("FAILED", error);
            alert("Something seems to have gone wrong. Please try again or email me directly. \nError: " + (error.text || "Check console"));
        }
    }
}

// --------------

// Modified code from
// Author: Gopi Chakradhar https://gopichakradhar.me/
// URL: https://freefrontend.com/javascript-carousels/
if (onPage === "projects") {
    const cards = document.querySelectorAll(".card");
    const dots = document.querySelectorAll(".dot");
    const upArrow = document.querySelectorAll(".nav-arrow.up");
    const downArrow = document.querySelectorAll(".nav-arrow.down");
    let currentIndex = 0;
    let isAnimating = false;
    let cardInterval;

    function updateCarousel(newIndex) {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = (newIndex + cards.length) % cards.length;

        cards.forEach((card, i) => {
            const offset = (i - currentIndex + cards.length) % cards.length;

            card.classList.remove(
                "center",
                "up-1",
                "up-2",
                "down-1",
                "down-2",
                // "hidden"
            );

            if (offset === 0) {
                card.classList.add("center");
            } else if (offset === 1) {
                card.classList.add("up-1");
            } else if (offset === 2) {
                card.classList.add("up-2");
            } else if (offset === cards.length - 1) {
                card.classList.add("down-1");
            } else if (offset === cards.length - 2) {
                card.classList.add("down-2");
            // } else {
                // card.classList.add("hidden");
            }

        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    function cardAutoScroll() {
        cardInterval = setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 4000);
    }
    cardAutoScroll();

    upArrow.forEach(arrow => {
        arrow.addEventListener("click", () => {
            clearInterval(cardInterval);
            updateCarousel(currentIndex - 1);
        });
    });

    downArrow.forEach(arrow => {
        arrow.addEventListener("click", () => {
            clearInterval(cardInterval);
            updateCarousel(currentIndex + 1);
        });
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            clearInterval(cardInterval);
            updateCarousel(i);
        });
    });

    cards.forEach((card, i) => {
        card.addEventListener("click", () => {
            clearInterval(cardInterval);
            updateCarousel(i);
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
            clearInterval(cardInterval);
            updateCarousel(currentIndex - 1);
        } else if (e.key === "ArrowDown") {
            clearInterval(cardInterval);
            updateCarousel(currentIndex + 1);
        }
    });

    updateCarousel(0);
}

// --------------
// Code added from wavePush.js repo for minification
// Inline comments removed. See wavePush.js repo for more.
// --------------

const canvas = document.querySelector('#wavepush');
const ctx = canvas.getContext('2d');
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;

let wavesArray;
let offset = 0;
let waveCount = 20;
let bandHeight = h / waveCount;
let numberOfParticles = 12;
var lineColor;

// ----------------------------------------------

let mouse = {
    x: undefined,
    y: undefined,
    radius: (h / 80) * (w / 80),
}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

window.addEventListener('mouseout',
    function () {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

window.addEventListener('resize',
    function () {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        bandHeight = h / waveCount;
        mouse.radius = ((h / 80) * (w / 80));
        init();
    }
);

function init() {
    wavesArray = [];
    for (let i = 0; i < waveCount; i++) {
        particlesArray = [];
        let y = bandHeight * (i + 1) - bandHeight / 2;

        for (let p = 0; p < numberOfParticles; p++) {
            let x = -200 + ((w + 200 * 2) / (numberOfParticles - 1) * p);

            particlesArray.push({
                x,
                y,
                xPos: x,
                yPos: y,
                vX: 0,
                vY: 0,
                amplitude: Math.random() * 30,
                period: Math.random() * Math.PI * 2,
                length: 0.005 + Math.random() * 0.01
            });
        }
        wavesArray.push(particlesArray);
    }
    lineColor = window.getComputedStyle(document.body).getPropertyValue('--c-wave').trim();
}

function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    offset -= 0.005;

    for (let i = 0; i < wavesArray.length; i++) {
        let wave = wavesArray[i];

        for (let j = 0; j < wave.length; j++) {
            p = wave[j];
            const layer1 = Math.sin(offset + p.period + (p.xPos * p.length)) * p.amplitude;
            const layer2 = Math.sin(offset * 2.5 + (p.xPos * 0.03)) * p.amplitude * 0.4;
            const layer3 = Math.sin(offset * 5 + (p.xPos * 0.08)) * 5;

            const dx = p.xPos - mouse.x;
            const dy = p.yPos - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouse.radius - dist) / mouse.radius;
                p.vX += Math.cos(angle) * force;
                p.vY += Math.sin(angle) * force * 3;
            }

            p.vX += (p.xPos - p.x) * 0.05;
            p.vY += (p.yPos + layer1 + layer2 + layer3 - p.y) * 0.05;

            p.vX *= 0.9;
            p.vY *= 0.9;

            p.x += p.vX;
            p.y += p.vY;
        }

        ctx.beginPath();

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 15;
        ctx.lineCap = 'round';

        ctx.moveTo(wave[0].x, wave[0].y);
        for (let p = 1; p < wave.length - 1; p++) {
            const xc = (wave[p].x + wave[p + 1].x) / 2;
            const yc = (wave[p].y + wave[p + 1].y) / 2;
            ctx.quadraticCurveTo(wave[p].x, wave[p].y, xc, yc);
        }
        ctx.stroke();
    }
    requestAnimationFrame(animateParticles);
}

init();
animateParticles();
