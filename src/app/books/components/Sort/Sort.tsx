import React, { useEffect, useRef, useState } from 'react'
import styles from './Sort.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { SortItem } from '@/constants/sortList'
import sortList from '@/constants/sortList'
import { selectFilter, setSortType } from '@/redux/slices/filterSlice'
const Sort = () => {
  const dispatch = useDispatch()
  const { sortType } = useSelector(selectFilter)

  const [open, setOpen] = useState(false)

  const sortRef = useRef<HTMLDivElement>(null)

  const onSelect = (obj: SortItem) => {
    dispatch(setSortType(obj))
    setOpen(false)
  }

  // закиття попапа якщо клік не по <Sort />
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={sortRef} className={styles.root}>
      <div onClick={() => setOpen(!open)}>
        Сортування за: <b className={styles.b}>{sortType.name}</b>
      </div>
      {open && (
        <ul className={styles.popup}>
          {sortList.map((obj, index) => (
            <li
              key={index}
              onClick={() => onSelect(obj)}
              className={
                sortType.sortProperty === obj.sortProperty ? styles.active : ''
              }
            >
              {obj.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Sort
