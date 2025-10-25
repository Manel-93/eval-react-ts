import type { User } from '../model/Users';

export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('https://dummyjson.com/users?limit=100'); 
    /*const response = await fetch('https://dummyjson.com/invalid-url');*/
    /*Si vous voulez tester la gestion d'erreur, je met la capture dans le README.md*/
    if (!response.ok) {
        throw new Error(`Échec de la récupération des données : Statut ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.users;
};

export const fetchUserById = async (id: number): Promise<User> => {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    
    if (!response.ok) {
        throw new Error(`Échec de la récupération de l'utilisateur ${id} : Statut ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};
