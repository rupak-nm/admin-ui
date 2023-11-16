import { getPagination } from "@/lib/pagination"
import { useState } from "react"

const usePagination = ({total}: {total: number}) => {
  const [currentPage, setCurrentPage] = useState(1)

  const {previous, next, pages} = getPagination(total, currentPage)

  return {
    previous: () => setCurrentPage(previous || 1),
    next: () => setCurrentPage(next || total),
    range: pages || [],
    setPage: (page: number) => setCurrentPage(page),
    active: currentPage
  }
}

export default usePagination