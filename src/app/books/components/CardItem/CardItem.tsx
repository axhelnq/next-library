import React from 'react'
import Image from 'next/image'
import styles from './CardItem.module.scss'
import Link from 'next/link'

const CardItem = ({ imageUrl, title, author, id }: Record<string, string>) => {
  return (
    <div className={styles.root}>
      <Image
        src={imageUrl}
        alt={'photo of book'}
        width={100}
        height={100}
        className={styles.img}
      />
      <div className={styles.info}>
        <h5>"{title}"</h5>
        <p>{author}</p>
        <Link href={`/books/${id}`}>More info</Link>
      </div>
    </div>
  )
}

export default CardItem
