import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import styles from './Search.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash.debounce'
import {
  selectFilter,
  setSearchType,
  setSearchValue,
} from '@/redux/slices/filterSlice'

const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const { searchType } = useSelector(selectFilter)

  const updateSearchValue = useCallback(
    debounce((str: string) => dispatch(setSearchValue(str)), 500),
    [],
  )

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={styles.root}>
      <input
        type="text"
        placeholder="Search.."
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
      />
      <div>
        <b>search by: </b>
        <button
          className={searchType === 'title' ? styles.active : ''}
          onClick={() => dispatch(setSearchType('title'))}
        >
          title
        </button>
        <button
          className={searchType === 'author' ? styles.active : ''}
          onClick={() => dispatch(setSearchType('author'))}
        >
          author
        </button>
      </div>
    </div>
  )
}

export default Search
