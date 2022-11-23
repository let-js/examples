export type SearchResultType = {
  title: string
  id?: number
  image?: string
  type?: number
  content: string
}

export type SearchType = {
  currentPage: number
  pageCount: number
  pageTotal: number
  result: SearchResultType[]
}
