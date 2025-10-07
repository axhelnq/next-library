'use client'

import styles from './Header.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <p className={styles.title}>Next Library</p>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={pathname === '/' ? styles.active : ''}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathname === '/books' ? styles.active : ''}>
            <Link href="/books">Books</Link>
          </li>
          <li className={pathname === '/me' ? styles.active : ''}>
            <Link href="/me">Me</Link>
          </li>
        </ul>

        <Link href={'/auth'} className={styles.logoutBtn}>
          Log Out
        </Link>
      </nav>
    </header>
  )
}
