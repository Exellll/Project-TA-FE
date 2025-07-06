export interface Meta {
    totalItems: number
    currentPage: number
    totalPages: number
    limit: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }

  export interface SelectOption {
    value: string
    label: string
  }