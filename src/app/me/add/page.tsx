'use client'

import React, { useState } from 'react'

import styles from './Add.module.scss'
import { useAppDispatch } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { createBookAsync } from '@/redux/slices/booksSlice'

const AddPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleCreate = () => {
    if (title && author && imageUrl) {
      const newBook = {
        title,
        author,
        imageUrl,
        // ownerId,
      }

      dispatch(createBookAsync(newBook))
      router.push(`/me`)
    }
  }

  return (
    <div className={styles.root}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        type="text"
        placeholder="Author"
      />
      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        type="text"
        placeholder="/images/bookMock.png"
      />
      <button onClick={handleCreate}>Add</button>
    </div>
  )
}

export default AddPage
