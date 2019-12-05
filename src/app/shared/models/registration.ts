export interface registration {
    id: string,
    code: string,
    details: string,
    level: number,
    student: {
        id: string,
        code?: string,
        name?: string,
        macAddress?: string,
        phoneNumber?: string,
        email?: string,
        image?: string,
        level?: number,
        collage?: {
            id?: string,
            code?: string,
            name?: string,
            location?: string,
            phoneNumber?: string,
            website?: string,
            Email?: string
        },
        ssn?: string
    },
    semester: {
        id: string;
        code?: string,
        collage?: {
            id?: string,
            code?: string,
            name?: string,
            location?: string,
            phoneNumber?: string,
            website?: string,
            Email?: string
        },
        fromDate?: Date,
        toDate?: Date
    }

}