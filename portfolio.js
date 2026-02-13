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
