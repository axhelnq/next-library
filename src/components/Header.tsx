import React from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.title}>Next Library</p>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/books'}>Books</Link>
          </li>
          <li>
            <Link href={'/me'}>Me</Link>
          </li>
        </ul>

        <button className={styles.logoutBtn}>Log Out</button>
      </nav>
    </header>
  )
}
