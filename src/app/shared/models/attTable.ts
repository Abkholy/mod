export interface attTable{
    id: string,
    code?: string,
    date?: Date,
    description?: string,

    location?: {
        id: string,
        code?: string,
        name?: string,
        scannerMacAddress?: string,
        capacity?: number,
        locationType?: {
            id?: string,
            code?: string,
            name?: string
        },
        collage?: {
            id: string,
            code?: string,
            name?: string,
            location?: string,
            phoneNumber?: string,
            website?: string,
            Email?: string
        }

    },
    subject: {
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
}