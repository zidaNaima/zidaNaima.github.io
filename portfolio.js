let page = window.location.pathname;
if (page == '/zidaNaima.github.io/') page = '/index.html';

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
}

// --------------

const ham = document.getElementById("hamburger");
const nav = document.querySelector("nav");

// call on initial page load
hamNav();
// call on screen resize
window.addEventListener('resize', hamNav);

function hamNav() {
    if (window.innerWidth < 768) {
        // initialize nav positioning
        nav.style.left = "-300px";

        ham.addEventListener("click", function () {
            if (nav.style.left === "-300px") {
                nav.style.left = "0";
            } else {
                nav.style.left = "-300px";
            }
        });
    } else {
        nav.style.left = null;
    }
}

// --------------

if (page === '/zidaNaima.github.io/experience.html' || page === '/experience.html') {
    const exp = document.getElementById("experience");
    const addit = document.getElementById("additional");

    function sectionAccordion(section) {
        const clkBtn = section.getElementsByClassName("click-open-btn");
        const clkCtn = section.getElementsByClassName("click-open-content");
        let last_opened = 0;

        // open first item by default
        clkCtn[0].style.height = "max-content";
        clkCtn[0].style.padding = "10px";
        clkBtn[0].style.backgroundColor = "var(--c-primary-dark)";

        for (let i = 0; i < clkBtn.length; i++) {
            clkBtn[i].addEventListener("click", function (event) {
                // close last opened section
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
                    // set new last opened section
                    last_opened = i;
                }
            });
        }
    }

    // run accordion for both sections
    sectionAccordion(exp);
    sectionAccordion(addit);
}

// --------------

if (page === '/zidaNaima.github.io/index.html' || page === '/index.html') {
    // Footer form submission
    const form = document.forms[0];
    const nameInput = form.name;
    const contactInput = form.contact;
    const messageInput = form.message;

    const publicKey = "xfbPdiVD70qK8vTY3";
    const serviceId = "service_g63duhk";
    const templateId = "template_nphcapj";

    // Form validation
    function validateMessage() {
        if (messageInput.value == "") { // no message entered
            alert("Please write a message before hitting submit.")
            return false;
        }
        return true;
    }

    // Form submission
    form.addEventListener("submit", (e) => {
        emailjs.init(publicKey);

        e.preventDefault(); // prevent form default behavior. Needed for outside submission.
        const inputFields = {
            name: nameInput.value,
            contact: contactInput.value,
            message: messageInput.value,
        };

        if (validateMessage()) {
            emailjs.send(serviceId, templateId, inputFields)
                .then(() => {
                    alert("Your message has been sent successfully. Thank you!");
                    nameInput.value = "";
                    contactInput.value = "";
                    messageInput.value = "";
                }, (error) => {
                    alert("Something seems to have gone wrong. Please try again or email me directly.");
                    console.log(error);
                });
        }

    });
}

// --------------

// Modified code from
// Author: Gopi Chakradhar https://gopichakradhar.me/
// URL: https://freefrontend.com/javascript-carousels/
if (page === '/zidaNaima.github.io/projects.html' || page === '/projects.html') {
    const cards = document.querySelectorAll(".card");
    const dots = document.querySelectorAll(".dot");
    const upArrow = document.querySelectorAll(".nav-arrow.up");
    const downArrow = document.querySelectorAll(".nav-arrow.down");
    let currentIndex = 0;
    let isAnimating = false;

    function updateCarousel(newIndex) {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = (newIndex + cards.length) % cards.length;

        cards.forEach((card, i) => {
            const offset = (i - currentIndex + cards.length) % cards.length;

            card.classList.remove(
                "center",
                "up-1",
                "down-1",
            );

            if (offset === 0) {
                card.classList.add("center");
            } else if (offset === 1) {
                card.classList.add("up-1");
            } else if (offset === 2) {
                card.classList.add("down-1");
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    upArrow.forEach(arrow => {
        arrow.addEventListener("click", () => {
            updateCarousel(currentIndex - 1);
        });
    });

    downArrow.forEach(arrow => {
        arrow.addEventListener("click", () => {
            updateCarousel(currentIndex + 1);
        });
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            updateCarousel(i);
        });
    });

    cards.forEach((card, i) => {
        card.addEventListener("click", () => {
            updateCarousel(i);
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
            updateCarousel(currentIndex - 1);
        } else if (e.key === "ArrowDown") {
            updateCarousel(currentIndex + 1);
        }
    });

    updateCarousel(0);
}