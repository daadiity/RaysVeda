import React from "react";

export default function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 transition"
      aria-label="Toggle Dark Mode"
    >
      🌙 / ☀️
    </button>
  );
}