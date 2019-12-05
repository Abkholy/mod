export interface location {
    id: string,
    code:string,
    name: string,
    scannerMacAddress: string,
    capacity: number,
    locationType: {
        id: string,
        code?: string,
        name?: string
    },
    collage: {
        id: string,
        code?: string,
        name?: string,
        location?: string,
        phoneNumber?: string,
        website?: string,
        Email?: string
    }


}