export interface EdsI {
    id: string
    schoolId: any
    effectiveDay: string[]
    effectiveHour: string
    createdAt: string
    updatedAt: string
    deletedAt: any
}

export interface PayloadEdsI {
    id: string
    effectiveDay: boolean[]
    effectiveHour: string
}
  