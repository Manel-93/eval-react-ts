import { useEffect, useState, useMemo } from 'react'; // Ajout de useMemo
import type { User } from '../model/Users';
import { fetchUsers } from '../data/UserApi';
import { UserCard } from './UserCard';
import './UserList.css';
import '../App.tsx';

// --- CONFIGURATION ---
const USERS_PER_PAGE = 10;
type SortKey = 'lastName' | 'age' | 'none'; // Clés de tri possibles

export const UserList = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]); // Renommé 'users' en 'allUsers' pour la source
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState<SortKey>('none');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // Ajout d'un état de chargement

    useEffect(() => {
        fetchUsers().then(data => {
            setAllUsers(data);
            setLoading(false);
        });
    }, []);

    // 1. LOGIQUE DE FILTRAGE, TRI ET PAGINATION
    const processedUsers = useMemo(() => {
        let users = [...allUsers];

        // A. Filtrage (Recherche temps réel par nom, prénom, email)
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            users = users.filter(user =>
                user.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
                user.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
                user.email.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        // B. Tri par Nom ou Âge
        if (sortKey !== 'none') {
            users.sort((a, b) => {
                if (sortKey === 'lastName') {
                    return a.lastName.localeCompare(b.lastName);
                }
                if (sortKey === 'age') {
                    return a.age - b.age;
                }
                return 0;
            });
        }
        
        // Important : Réinitialiser la page à 1 si le filtrage ou le tri change
        // (Ceci doit être géré en dehors de useMemo, mais nous laissons l'utilisateur final trié)
        // Nous gérons le changement de page via le changement des dépendances.

        return users;
    }, [allUsers, searchTerm, sortKey]);

    // Déclencher la réinitialisation de la page quand la liste filtrée/triée change
    useEffect(() => {
        setCurrentPage(1);
    }, [processedUsers]);


    // C. Pagination
    const totalPages = Math.ceil(processedUsers.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const paginatedUsers = processedUsers.slice(
        startIndex,
        startIndex + USERS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    if (loading) {
        return <div className="loading">Chargement des utilisateurs...</div>;
    }


    return (
        <div className="user-list">
            <div className="user-header">
                <h2 className="user-header-title">Gestion des utilisateurs</h2>
            </div>

            <h1>Liste des utilisateurs</h1>

            {/* NOUVELLE BARRE DE CONTRÔLE */}
            <div className="user-controls">
                <input
                    type="text"
                    placeholder="Rechercher (Nom, Prénom, Email)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select 
                    value={sortKey} 
                    onChange={(e) => setSortKey(e.target.value as SortKey)}
                    className="sort-select"
                >
                    <option value="none">Trier par...</option>
                    <option value="lastName">Nom (A-Z)</option>
                    <option value="age">Âge (Croissant)</option>
                </select>
            </div>

            <div className="user-grid">
                {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))
                ) : (
                    <p className="no-results">Aucun utilisateur trouvé.</p>
                )}
            </div>

            {/* CONTRÔLES DE PAGINATION */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ← Précédent
                    </button>
                    <span>Page {currentPage} de {totalPages}</span>
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Suivant →
                    </button>
                </div>
            )}
        </div>
    );
};