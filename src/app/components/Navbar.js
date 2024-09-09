'use client';
import React from 'react';

export default function Navbar({ toggleDarkMode, darkMode }) {
  return (
    <nav className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} shadow-md`}>
      <div className="container mx-auto flex items-center justify-between">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-100'}`}>CRM Stats</h1>
        <button
          onClick={toggleDarkMode}
          className={`text-white bg-gray-700 p-2 rounded-md hover:bg-gray-600 ${darkMode ? 'bg-gray-600' : 'bg-gray-700'}`}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
}
