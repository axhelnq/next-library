import React from 'react'

const Header = () => {
  return (
    <header className="border-b border-b-gray-900 flex items-center justify-between">
      <p className="text-2xl font-black">Next Library</p>
      <nav className="flex items-center justify-between gap-3">
        <ul className="flex items-center justify-between gap-3">
          <li>Home</li>
          <li>Books</li>
          <li>Me</li>
        </ul>
        <button className="text-white bg-gray-700 px-2 py-3 rounded-xl">
          Log Out
        </button>
      </nav>
    </header>
  )
}

export default Header
