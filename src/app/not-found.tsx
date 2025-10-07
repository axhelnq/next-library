import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div>
      <h2>404 - Нічого не знайдено</h2>{' '}
      <Link href={'/'}>повернутись назад</Link>
    </div>
  )
}

export default NotFound
