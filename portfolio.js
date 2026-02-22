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

if (page === '/zidaNaima.github.io/experience.html' || page === '/experience.html') {

    // Desktop-only function
    // Calculate and set the height of the experience section
    function setExperienceHeight() {
        const expItems = document.querySelectorAll("#experience .click-open-content");
        var maxHeight = 0;

        expItems.forEach(item => {
            maxHeight = Math.max(maxHeight, item.scrollHeight);
        });

        // 24 line height of h3, 20 gap under h3, 50 bottom padding
        document.getElementById("experience").style.height = (maxHeight + 94) + "px";
    }

    // --------------

    const exp = document.getElementById("experience");
    const addit = document.getElementById("additional");

    function sectionAccordion(section) {
        // Variables to toggle the items
        const clkBtn = section.getElementsByClassName("click-open-btn");
        const clkCtn = section.getElementsByClassName("click-open-content");
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
    sectionAccordion(exp);
    sectionAccordion(addit);

    // --------------

    // Run "desktop mode" if desktop
    var expScreenIsDesktop = window.innerWidth >= 768;

    function checkDesktop() {
        var expResizedToDesktop = window.innerWidth >= 768;

        if (expResizedToDesktop && !expScreenIsDesktop) {
            // Just resized into desktop mode
            // Enable desktop mode

            // Wipe padding for all but first
            const expCtn = document.getElementById("experience").getElementsByClassName("click-open-content");
            const addtCtn = document.getElementById("additional").getElementsByClassName("click-open-content");
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
            document.getElementById("experience").style.removeProperty("height");

            const clkCtn = document.getElementsByClassName("click-open-content");
            for (let i = 0; i < clkCtn.length; i++) {
                clkCtn[i].style.padding = "10px";
            }

        } else if (expResizedToDesktop && expScreenIsDesktop) {
            // Screen initialized to desktop
            setExperienceHeight();
        } else {
            // Screen initialized to mobile
            document.getElementById("experience").style.removeProperty("height");

            const clkCtn = document.getElementsByClassName("click-open-content");
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
        if (nameInput.value == "" || contactInput.value == "" || messageInput.value == "") { // All required content not entered
            alert("Please fill out all required information before sending your message.")
            return false;
        }
        return true;
    }

    // Form submission
    form.addEventListener("submit", (e) => {
        emailjs.init(publicKey);

        e.preventDefault(); // Prevent form default behavior. Needed for outside submission.
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