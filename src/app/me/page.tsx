'use client'
import React, { useEffect } from 'react'

import styles from './Me.module.scss'
import { RootState, useAppDispatch } from '@/redux/store'
import { fetchData } from '@/redux/slices/booksSlice'
import { useSelector } from 'react-redux'
import ListItem from '@/app/me/components/ListItem/ListItem'
import Link from 'next/link'

const MePage = () => {
  const dispatch = useAppDispatch()

  const { status, items } = useSelector((state: RootState) => state.books)

  useEffect(() => {
    dispatch(fetchData({}))
  }, [dispatch])

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <h2>Your books:</h2>
        <Link href={'/me/add'}>add book</Link>
      </div>
      <ul className={styles.list}>
        {items.map((item) => (
          <ListItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  )
}

export default MePage
