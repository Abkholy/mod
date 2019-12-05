export interface registrationLines {
    registration: {
        id: string,
        code?: string,
        details?: string,
        level?: number,
        student?: {
            id?: string,
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
        semester?: {
            id?: string;
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
    
    },
    subject?: {
        id?: string
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
    timeTable?: {
        id?: string,
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
}