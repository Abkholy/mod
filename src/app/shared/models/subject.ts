export interface subject {
    id: string
    code?: string,
    name?: string,
    creditHours?: number,
    defaultInstructor?: string,
    files?: string,
    description?: string,
    collage?: {
        id: string,
        code?: string,
        name?: string,
        location?: string,
        phoneNumber?: string,
        website?: string,
        Email?: string
    }

}