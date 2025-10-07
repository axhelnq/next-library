import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilter, setCurrentPage } from '@/redux/slices/filterSlice'

const Pagination: React.FC = () => {
  const dispatch = useDispatch()
  const { currentPage } = useSelector(selectFilter)

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={5} // захардкожено, бо json-server не вміє повертати к-сть сторінок
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
