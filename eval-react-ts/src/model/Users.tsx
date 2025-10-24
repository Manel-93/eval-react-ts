export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image: string;
    age: number;
    company: {
        name: string;
        title: string;
        department: string;
    };
    address: {
        city: string;
        street: string;
        state: string;
        postalCode: string;
    };
}

export interface UsersResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}