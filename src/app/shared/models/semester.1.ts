export interface semester {
    id: string ;
    code?: string,
    collage: {
        id: string,
        code?: string,
        name?: string,
        location?: string,
        phoneNumber?: string,
        website?: string,
        Email?: string
    },
    fromDate?: Date ,
    toDate?: Date
}