export interface timetable{ 
    id: string,
    code?: string,
    dayOfWeek?: string,
    length?: number,
    period?: number,
    subject?: {
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
    },
    location?: {
        id: string,
        code?: string,
        name?: string,
        scannerMacAddress?: string,
        capacity?: number,
        locationType?: {
            id: string,
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
    semester?: {
        id: string;
        code?: string,
        collage?: {
            id: string,
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