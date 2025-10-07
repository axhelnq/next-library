export type SortItem = {
  name: string
  sortProperty: string
}

const sortList: SortItem[] = [
  { name: 'назва (DESC)', sortProperty: 'title' },
  { name: 'назва (ASC)', sortProperty: '-title' },
] as const

export default sortList

// 3. Список книг (/books):
//  • Пошук за title або author.
//  • Сортування за алфавітом.
