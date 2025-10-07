import React from 'react'

import styles from './InfoBar.module.scss'

const InfoBar = () => {
  return (
    <div className={styles.root}>
      <b>username</b>
      <p>
        Count of ur books: <b>0</b>
      </p>
    </div>
  )
}

export default InfoBar
