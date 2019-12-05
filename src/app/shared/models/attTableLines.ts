export interface attTableLines {
    id?: string,
    code?: string,
    date?:Date,
    description?: string,
    attTable?: {
        id: string
    },
    student?: {
        id: string,
        code?: string,
        name?: string,
    },
    subject?: {
        id: string,
        code?: string,
        name?: string,
    },
    timeTable?: {
        id: string,
        code?: string
    }
}