import React from 'react';
import './DarkMode.css';

const setDark = () => {
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');
};

const setLight = () => {
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
};

const storedTheme = localStorage.getItem('theme');

// Checking the user's browser settings for preferred color scheme
const prefersDark =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

// Check localStorage and preferred color scheme and set to light mode if true
const defaultDark =
  storedTheme === 'dark' || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
}

const toggleTheme = (e) => {
  if (e.target.checked) {
    setLight();
  } else {
    setDark();
  }
};

export function DarkMode() {
  return (
    <div className="dark-mode-toggle">
      <label className="toggle-theme">
        <input type="checkbox" id="checkbox" onChange={toggleTheme} />
        <div className="slider round"></div>
      </label>
    </div>
  );
}
