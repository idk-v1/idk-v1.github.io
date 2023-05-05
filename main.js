var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (localStorage.getItem("theme") === "dark")
    dark = true;
if (localStorage.getItem("theme") === "light")
    dark = false;

document.querySelector("link").href = (dark ? "dark.css" : "light.css");

function toggleTheme()
{
    dark = !dark;
    localStorage.setItem("theme", (dark ? "dark" : "light"));
    document.querySelector("link").href = (dark ? "dark.css" : "light.css");
}