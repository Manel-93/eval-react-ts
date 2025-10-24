import type { User } from '../model/Users';

export const fetchUsers = async () => {
    const response = await fetch('https://dummyjson.com/users?limit=100'); 
    const data = await response.json();
    return data.users;
};

export const fetchUserById = async (id: number) => {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    const data = await response.json();
    return data;
};