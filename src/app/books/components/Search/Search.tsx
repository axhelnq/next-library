import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import styles from './Search.module.scss'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import { setSearchValue } from '@/redux/slices/filterSlice'

const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

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
      <button>search</button>
    </div>
  )
}

export default Search
