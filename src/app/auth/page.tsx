'use client'
import React, { useState } from 'react'
import styles from './Auth.module.scss'
import Link from 'next/link'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handleLogin = () => {
    setIsLogin((prevState) => !prevState)
  }
  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <h2 className={styles.heading}>
          {isLogin ? 'Авторизація' : 'Реєстрація'}
        </h2>

        <form className={styles.form}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Ім'я</label>
              <input
                type="text"
                placeholder="Ваше ім'я"
                className={styles.input}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Пароль</label>
            <input
              type="password"
              required
              placeholder="Пароль"
              className={styles.input}
            />
          </div>

          <Link href="/" className={styles.submitButton}>
            {isLogin ? 'Увійти' : 'Зареєструватися'}
          </Link>
        </form>

        <p className={styles.footerText}>
          {isLogin ? 'Немає акаунта?' : 'Вже є акаунт?'}{' '}
          <button onClick={handleLogin} className={styles.toggleLink}>
            {isLogin ? 'Зареєструватися' : 'Увійти'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Auth
