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

const exp = document.getElementById("experience");
const addit = document.getElementById("additional");

function sectionAccordion(section) {
    const clkBtn = section.getElementsByClassName("click-open-btn");
    const clkCtn = section.getElementsByClassName("click-open-content");
    let last_opened = 0;

    // open first item by default
    clkCtn[0].style.height = "max-content";
    clkCtn[0].style.padding = "10px";
    clkBtn[0].style.backgroundColor = "var(--c-primary)";

    for (let i = 0; i < clkBtn.length; i++) {
        clkBtn[i].addEventListener("click", function (event) {
            // close last opened section
            clkCtn[last_opened].style.height = null;
            clkCtn[last_opened].style.padding = "0";
            clkBtn[last_opened].style.backgroundColor = "var(--c-secondary)";

            if (clkCtn[i].style.height) {
                clkCtn[i].style.height = null;
                clkCtn[i].style.padding = "0";
            } else {
                clkCtn[i].style.height = "max-content";
                clkCtn[i].style.padding = "10px";
                clkBtn[i].style.backgroundColor = "var(--c-primary)";
                // set new last opened section
                last_opened = i;
            }
        });
    }
}

// run accordion for both sections
sectionAccordion(exp);
sectionAccordion(addit);
