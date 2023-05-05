var dark = localStorage.getItem("theme") === "dark";
document.querySelector("link").href = (dark ? "dark.css" : "light.css");