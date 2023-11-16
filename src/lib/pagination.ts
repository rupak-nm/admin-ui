const EDGE_COUNT = 1
const MIDDLE_COUNT = 5

const getMiddlePages = (currentPage: number, count: number) => {
  const pages = [currentPage]

  for (let i = 1; i <= Math.floor(count / 2); i++) {
    pages.push(currentPage + i)
    pages.unshift(currentPage - i)
  }

  return pages
}

const getPreviousPage = (currentPage: number, totalPages: number) => {
  if (currentPage <= 1) {
    return undefined
  }

  if (currentPage > totalPages) {
    return totalPages
  }

  return currentPage - 1
}

const getNextPage = (currentPage: number, totalPages: number) => {
  if (currentPage >= totalPages) {
    return undefined
  }

  if (currentPage < 1) {
    return 1
  }

  return currentPage + 1
}

const getPagination = (totalPages: number, currentPage: number) => {
  if (totalPages === null || totalPages === undefined) {
    return {
      previous: undefined,
      pages: undefined,
      next: undefined
    }
  }

  if (currentPage === null || currentPage === undefined) {
    currentPage = 1
  }

  const previous = getPreviousPage(currentPage, totalPages)
  const next = getNextPage(currentPage, totalPages)

  const allPagesArray = Array(totalPages)
    .fill(0)
    .map((_, i) => {
      return i + 1
    })

  if (allPagesArray.length <= 2 * EDGE_COUNT) {
    return { previous, pages: allPagesArray, next }
  }

  const firstSlice = allPagesArray.slice(0, EDGE_COUNT)
  const lastSlice = allPagesArray.slice(-EDGE_COUNT)
  const middleSlice = getMiddlePages(currentPage, MIDDLE_COUNT)

  const set = new Set([...firstSlice, ...middleSlice, ...lastSlice])
  const uniquePagesArray = Array.from(set).sort((a, b) => {
    return a - b
  })

  const pages = uniquePagesArray.reduce((acc: Array<null | number>, curr: number) => {
    if (allPagesArray.includes(curr)) {
      const prevItem = acc[acc.length - 1]
      if (typeof prevItem === 'number' && curr - prevItem > 1) {
        acc.push(null)
      }
      acc.push(curr)
    }
    return acc
  }, [])

  return { previous, pages, next }
}

export { getPagination }
