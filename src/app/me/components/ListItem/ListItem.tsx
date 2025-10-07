import React from 'react'
import Image from 'next/image'

import styles from './ListItem.module.scss'
import { deleteBook } from '@/redux/slices/booksSlice'
import { useAppDispatch } from '@/redux/store'

const ListItem = ({ imageUrl, title, author, id }: Record<string, string>) => {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteBook(id))
  }

  return (
    <li className={styles.root}>
      <Image src={imageUrl} alt={'photo of book'} width={40} height={40} />
      <h5>"{title}"</h5>
      <p>{author}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default ListItem
