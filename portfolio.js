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

ham.addEventListener("click", function () {
    if (nav.style.left) {
        nav.style.left = null;
    } else {
        nav.style.left = "-300px";
    }
});
