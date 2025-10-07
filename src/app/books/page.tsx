'use client'

import React, { useEffect, useRef } from 'react'

import styles from './Books.module.scss'
import CardItem from '@/app/books/components/CardItem/CardItem'
import Search from '@/app/books/components/Search/Search'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/redux/store'
import { fetchData } from '@/redux/slices/booksSlice'
import Sort from '@/app/books/components/Sort/Sort'
import sortList, { SortItem } from '@/constants/sortList'
import { selectFilter, setFilters } from '@/redux/slices/filterSlice'
import Pagination from '@/app/books/components/Pagination/Pagination'
import { useRouter } from 'next/navigation'
import qs from 'qs'

const BooksPage = () => {
  const dispatch = useAppDispatch()

  const { sortType, currentPage, searchValue } = useSelector(selectFilter)

  const router = useRouter()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { status, items } = useSelector((state: RootState) => state.books)

  const getData = async () => {
    const sortBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&title_like=${searchValue}` : ''

    dispatch(
      fetchData({
        sortBy,
        order,
        search,
        currentPage: `${currentPage}`,
      }),
    )
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  // якщо змінили параметри і був перший рендер
  useEffect(() => {
    // не костиль а лайфхак
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,

        currentPage,
      })
      router.push(`?${queryString}`)
    }
    isMounted.current = true
  }, [sortType.sortProperty, currentPage])

  // якщо був перший рендер то провірка url параметри і зберігаєм в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      console.log(params)

      const sortType = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty,
      )

      // todo type guard undefined
      dispatch(setFilters({ ...params, sortType }))
      isSearch.current = true
    }
  }, [])

  // якщо зміна параметрів робим запит піц
  useEffect(() => {
    getData()

    isSearch.current = false
  }, [sortType.sortProperty, searchValue, currentPage])

  if (status === 'error') {
    return <p>Сталася помилка при завантаженні книжок</p>
  }

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <h2 className={styles.title}>Books</h2>
        <div>
          <Search />
        </div>
        <Sort />
      </div>
      <div className={styles.items}>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          items.map((item) => <CardItem key={item.id} {...item} />)
        )}
      </div>
      <Pagination />
    </div>
  )
}

export default BooksPage
