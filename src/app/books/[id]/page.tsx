'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'

import styles from './Id.module.scss'
import { RootState, useAppDispatch } from '@/redux/store'
import { useSelector } from 'react-redux'
import { useParams, useRouter } from 'next/navigation'
import { deleteBook, fetchData } from '@/redux/slices/booksSlice'
import { fetchUserById } from '@/redux/slices/usersSlice'
import Link from 'next/link'

const IdBookPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { id } = useParams() // отримуємо id з маршруту

  const books = useSelector((state: RootState) => state.books.items)

  useEffect(() => {
    if (!books.length) {
      dispatch(fetchData({}))
    }
  }, [books.length])

  const book = books.find((b) => b.id === id)

  useEffect(() => {
    if (typeof id === 'string' && book) {
      dispatch(fetchUserById(book.ownerId))
    }
  }, [book])

  const user = useSelector((state: RootState) => state.users.item)

  if (!book) {
    return <div>Книга не знайдена</div>
  }

  const handleDelete = () => {
    dispatch(deleteBook(book.id))
    router.push('/books')
  }

  return (
    <div className={styles.root}>
      <Link className={styles.link} href={'/books'}>
        Назад
      </Link>
      <div className={styles.card}>
        <Image
          src={book.imageUrl}
          alt={'image of book'}
          width={200}
          height={200}
        />
        <div className={styles.body}>
          <h2>{book.title}</h2>
          <div className={styles.info}>
            <b>{book.author}</b>
            <em>{user.name}</em>
          </div>
          <div>
            <button disabled={true}>trade</button>
            <button onClick={handleDelete}>delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdBookPage
