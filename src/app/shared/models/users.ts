export interface users {
    id: string;
    userId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
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